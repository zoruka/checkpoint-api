import { FindAccountRepository } from '../protocols/database';
import { FindAccount } from '../../domain/usecases';

export class DbFindAccount implements FindAccount {
	constructor(
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async findOne(params: FindAccount.Params): Promise<FindAccount.Result> {
		return this.findAccountRepository.findOne(params);
	}
}
