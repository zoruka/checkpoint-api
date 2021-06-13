import { BindGroupAccount } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	BinderGroupRepository,
	FindAccountRepository,
	FindGroupByIdRepository,
} from '../../protocols';

export class DbBindGroupAccount implements BindGroupAccount {
	constructor(
		private readonly binderGroupRepository: BinderGroupRepository,
		private readonly findAccountRepository: FindAccountRepository,
		private readonly findGroupByIdRepository: FindGroupByIdRepository
	) {}

	async bindAccountId(
		params: BindGroupAccount.Params
	): Promise<BindGroupAccount.Result> {
		const group = await this.findGroupByIdRepository.findById(
			params.groupId
		);

		if (!group) throw new DatabaseError.NotFound('Group id not found');

		const account = await this.findAccountRepository.findOne(
			params.accountId
		);

		if (!account) throw new DatabaseError.NotFound('Account id not found');

		await this.binderGroupRepository.bind(params);
	}
}
