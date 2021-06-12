import {
	AddAccountRepository,
	FindAccountByEmailRepository,
	FindAccountByUsernameRepository,
} from '../protocols/database';
import { AddAccount } from '../../domain/usecases';
import { Hasher } from '../protocols';
import { AccountError } from '../errors';
import { Account } from '../../domain/models';

export class DbAddAccount implements AddAccount {
	constructor(
		private readonly addAccountRepository: AddAccountRepository,
		private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
		private readonly findAccountByUsernameRepository: FindAccountByUsernameRepository,
		private readonly hasher: Hasher
	) {}

	async add(params: AddAccount.Params): Promise<AddAccount.Result> {
		if (await this.findAccountByEmailRepository.findByEmail(params.email))
			throw new AccountError.EmailConflict();
		if (
			await this.findAccountByUsernameRepository.findByUsername(
				params.username
			)
		)
			throw new AccountError.UsernameConflict();

		const passwordHash = await this.hasher.hash({
			plaintext: params.password,
		});
		const date = new Date();

		return this.addAccountRepository.add({
			access: params.access,
			email: params.email,
			name: params.name,
			password: passwordHash,
			username: params.username,
			avatarPath: null,
			createdAt: date,
			updatedAt: date,
		});
	}
}
