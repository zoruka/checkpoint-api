import { AddGroup } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	AddGroupBindingRepository,
	AddGroupRepository,
	FindAccountRepository,
	GenerateGroupTagRepository,
} from '../../protocols';

export class DbAddGroup implements AddGroup {
	constructor(
		private readonly generateGroupTagRepository: GenerateGroupTagRepository,
		private readonly addGroupRepository: AddGroupRepository,
		private readonly addGroupBindingRepository: AddGroupBindingRepository,
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async add(params: AddGroup.Params): Promise<AddGroup.Result> {
		const adminAccount = await this.findAccountRepository.findOne(
			params.adminId
		);

		if (!adminAccount)
			throw new DatabaseError.NotFound('Account id not found');

		const tag = await this.generateGroupTagRepository.generateTag();
		const date = new Date();

		const groupBinding = await this.addGroupBindingRepository.addBinding({
			createdAt: date,
			updatedAt: date,
			users: {},
		});

		const result = await this.addGroupRepository.add({
			createdAt: date,
			updatedAt: date,
			bindingId: groupBinding.id,
			name: params.name,
			adminId: params.adminId,
			tag,
		});

		return result;
	}
}
