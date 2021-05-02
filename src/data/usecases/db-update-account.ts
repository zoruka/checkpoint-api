import { UpdateAccountRepository } from '../protocols/database';
import { UpdateAccount } from '../../domain/usecases';

export class DbUpdateAccount implements UpdateAccount {
	constructor(
		private readonly updateAccountRepository: UpdateAccountRepository
	) {}

	async update(params: UpdateAccount.Params): Promise<UpdateAccount.Result> {
		return this.updateAccountRepository.update(params);
	}
}
