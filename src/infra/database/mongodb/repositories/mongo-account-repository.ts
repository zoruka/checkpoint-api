import { ObjectID } from 'mongodb';
import {
	AddAccountRepository,
	FetchAccountsRepository,
	FindAccountByEmailRepository,
	FindAccountByUsernameRepository,
	FindAccountRepository,
	UpdateAccountRepository,
} from '../../../../data/protocols';
import { Account } from '../../../../domain/models';
import { MongoHelper } from '../mongo-helper';

export class MongoAccountRepository
	implements
		AddAccountRepository,
		FindAccountRepository,
		FindAccountByEmailRepository,
		FindAccountByUsernameRepository,
		UpdateAccountRepository,
		FetchAccountsRepository
{
	async add(
		params: AddAccountRepository.Params
	): Promise<AddAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const result = await accountCollection.insertOne(params);
		return {
			...params,
			id: result.insertedId,
		};
	}

	async findOne(
		id: FindAccountRepository.Params
	): Promise<FindAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const account = await accountCollection.findOne({
			_id: new ObjectID(id),
		});
		return account && MongoHelper.map(account);
	}

	async findByEmail(
		email: FindAccountByEmailRepository.Params
	): Promise<FindAccountByEmailRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const account = await accountCollection.findOne({ email });
		return account && MongoHelper.map(account);
	}

	async findByUsername(
		username: FindAccountByUsernameRepository.Params
	): Promise<FindAccountByUsernameRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const account = await accountCollection.findOne({ username });
		return account && MongoHelper.map(account);
	}

	async update({
		id,
		...updateParams
	}: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const updatedAccount = await accountCollection.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{
				$set: updateParams,
			},
			{ returnOriginal: false }
		);
		return updatedAccount.value && MongoHelper.map(updatedAccount.value);
	}

	async fetchIds(
		ids: FetchAccountsRepository.Params
	): Promise<FetchAccountsRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');

		const shorts: Account.Short[] = [];

		for (const id of ids) {
			const account = await accountCollection.findOne(
				{ _id: new ObjectID(id) },
				{ projection: { name: 1, username: 1, _id: 1 } }
			);

			if (account) shorts.push(MongoHelper.map(account));
		}

		return shorts;
	}
}
