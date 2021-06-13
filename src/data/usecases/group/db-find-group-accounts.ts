import { FindGroupAccounts } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	FetchAccountsRepository,
	FindGroupBindingRepository,
	FindGroupByIdRepository,
} from '../../protocols';

export class DbFindGroupAccounts implements FindGroupAccounts {
	constructor(
		private readonly findGroupByIdRepository: FindGroupByIdRepository,
		private readonly findGroupBindingRepository: FindGroupBindingRepository,
		private readonly fetchAccountsRepository: FetchAccountsRepository
	) {}

	async findAccounts(
		groupId: FindGroupAccounts.Params
	): Promise<FindGroupAccounts.Result> {
		const group = await this.findGroupByIdRepository.findById(groupId);
		if (!group) throw new DatabaseError.NotFound('Group id not found');

		const groupBinding = await this.findGroupBindingRepository.findBinding(
			group.bindingId
		);
		if (!groupBinding)
			throw new DatabaseError.NotFound('GroupBinding id not found');

		const toFetchIds = Object.entries(groupBinding.accounts).reduce(
			(ids, [id, condition]) => (condition ? [...ids, id] : ids),
			[] as string[]
		);

		const fetchResult = await this.fetchAccountsRepository.fetchIds(
			toFetchIds
		);

		return fetchResult;
	}
}
