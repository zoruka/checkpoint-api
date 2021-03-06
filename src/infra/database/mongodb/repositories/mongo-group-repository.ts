import { ObjectID } from 'mongodb';
import {
	AddGroupBindingRepository,
	AddGroupRepository,
	FindGroupBindingRepository,
	FindGroupByIdRepository,
	FindGroupsRepository,
	BinderGroupRepository,
	UpdateGroupRepository,
	GenerateGroupTagRepository,
	FindGroupsByAccountRepository,
} from '../../../../data/protocols';
import { Group } from '../../../../domain/models';
import { FindGroups } from '../../../../domain/usecases';
import { MongoHelper } from '../mongo-helper';

export class MongoGroupRepository
	implements
		AddGroupRepository,
		AddGroupBindingRepository,
		BinderGroupRepository,
		FindGroupsRepository,
		FindGroupBindingRepository,
		FindGroupByIdRepository,
		UpdateGroupRepository,
		GenerateGroupTagRepository,
		FindGroupsByAccountRepository
{
	async add(
		params: AddGroupRepository.Params
	): Promise<AddGroupRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('groups');
		const result = await accountCollection.insertOne(params);
		const bindingsCollection = await MongoHelper.getCollection(
			'group-bindings'
		);

		await bindingsCollection.findOneAndUpdate(
			{ _id: params.bindingId },
			{ $set: { groupId: result.insertedId } }
		);

		return {
			...params,
			id: result.insertedId,
		};
	}

	async addBinding(
		params: AddGroupBindingRepository.Params
	): Promise<AddGroupBindingRepository.Result> {
		const bindingsCollection = await MongoHelper.getCollection(
			'group-bindings'
		);
		const result = await bindingsCollection.insertOne(params);
		return {
			...params,
			id: result.insertedId,
		};
	}

	async bind(
		params: BinderGroupRepository.Params
	): Promise<BinderGroupRepository.Result> {
		const group = await this.findById(params.groupId);
		const bindingsCollection = await MongoHelper.getCollection(
			'group-bindings'
		);
		const updatedBinding = await bindingsCollection.findOneAndUpdate(
			{ _id: new ObjectID(group?.bindingId) },
			{
				$set: {
					[`accounts.${params.accountId}`]: params.bind
						? new Date()
						: null,
				},
			},
			{ returnOriginal: false }
		);
		return updatedBinding.value && MongoHelper.map(updatedBinding.value);
	}

	async findById(
		id: FindGroupByIdRepository.Params
	): Promise<FindGroupByIdRepository.Result> {
		const groupsCollection = await MongoHelper.getCollection('groups');
		const group = await groupsCollection.findOne({
			_id: new ObjectID(id),
		});
		return group && MongoHelper.map(group);
	}

	async findBinding(
		id: FindGroupBindingRepository.Params
	): Promise<FindGroupBindingRepository.Result> {
		const bindingsCollection = await MongoHelper.getCollection(
			'group-bindings'
		);
		const group = await bindingsCollection.findOne({
			_id: new ObjectID(id),
		});
		return group && MongoHelper.map(group);
	}

	async find(searchValue: FindGroups.Params): Promise<FindGroups.Result> {
		const groupsCollection = await MongoHelper.getCollection('groups');

		const groups = await groupsCollection
			.find({
				name: new RegExp(`.*${searchValue}.*`, 'i'),
			})
			.toArray();

		return groups.map((group) => MongoHelper.map(group));
	}

	async update({
		id,
		...updateParams
	}: UpdateGroupRepository.Params): Promise<UpdateGroupRepository.Result> {
		const groupsCollection = await MongoHelper.getCollection('groups');
		const updatedGroups = await groupsCollection.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{
				$set: updateParams,
			},
			{ returnOriginal: false }
		);
		return updatedGroups.value && MongoHelper.map(updatedGroups.value);
	}

	async generateTag(): Promise<GenerateGroupTagRepository.Result> {
		const bindingsCollection = await MongoHelper.getCollection(
			'group-bindings'
		);
		const length = await bindingsCollection.countDocuments();
		return `000000${length}`.slice(-6);
	}

	async findByAccount(
		accountId: FindGroupsByAccountRepository.Params
	): Promise<FindGroupsByAccountRepository.Result> {
		const bindingsCollection = await MongoHelper.getCollection(
			'group-bindings'
		);

		const bindings = await bindingsCollection
			.find({
				[`accounts.${accountId}`]: {
					$ne: null,
					$exists: true,
				},
			})
			.toArray();

		const groups: Group.Model[] = [];
		for (const binding of bindings) {
			const group = await this.findById(binding.groupId);
			if (group) groups.push(group);
		}

		return groups;
	}
}
