import { FindAccountGroups } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	FindAccountRepository,
	FindGroupsByAccountRepository,
} from '../../protocols';

export class DbFindAccountGroups implements FindAccountGroups {
	constructor(
		private readonly findGroupByAccountRepository: FindGroupsByAccountRepository,
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async findAccountGroups(
		accountId: FindAccountGroups.Params
	): Promise<FindAccountGroups.Result> {
		const account = await this.findAccountRepository.findOne(accountId);
		if (!account) throw new DatabaseError.NotFound('Account id not found');

		return this.findGroupByAccountRepository.findByAccount(accountId);
	}
}
