import { FindAccountRepository } from '../../protocols/database';
import { FindAccount } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';

export class DbFindAccount implements FindAccount {
	constructor(
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async findOne(params: FindAccount.Params): Promise<FindAccount.Result> {
		const findResult = await this.findAccountRepository.findOne(params.id);

		if (!findResult) throw new DatabaseError.NotFound('Id not found');

		return findResult;
	}
}
