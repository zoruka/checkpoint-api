import { AddAccountRepository } from '../protocols/database';
import { AddAccount } from '../../domain/usecases';

export class DbAddAccount implements AddAccount {
	constructor(private readonly addAccountRepository: AddAccountRepository) {}

	async add(params: AddAccount.Params): Promise<AddAccount.Result> {
		return this.addAccountRepository.add(params);
	}
}
