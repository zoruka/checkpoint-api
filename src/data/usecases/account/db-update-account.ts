import {
	FindAccountByEmailRepository,
	FindAccountByUsernameRepository,
	FindAccountRepository,
	UpdateAccountRepository,
} from '../../protocols/database';
import { UpdateAccount } from '../../../domain/usecases';
import { AccountError, DatabaseError } from '../../errors';
import { Hasher } from '../../protocols';

export class DbUpdateAccount implements UpdateAccount {
	constructor(
		private readonly updateAccountRepository: UpdateAccountRepository,
		private readonly findAccountRepository: FindAccountRepository,
		private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
		private readonly findAccountByUsernameRepository: FindAccountByUsernameRepository,
		private readonly hasher: Hasher
	) {}

	async update(params: UpdateAccount.Params): Promise<UpdateAccount.Result> {
		const currentAccount = await this.findAccountRepository.findOne(
			params.id
		);
		if (!currentAccount)
			throw new DatabaseError.NotFound('User id not found');

		if (params.email) {
			const foundAccount =
				await this.findAccountByEmailRepository.findByEmail(
					params.email
				);
			if (foundAccount) throw new AccountError.EmailConflict();
		}

		if (params.username) {
			const foundAccount =
				await this.findAccountByUsernameRepository.findByUsername(
					params.username
				);
			if (foundAccount) throw new AccountError.UsernameConflict();
		}

		let newPassword = params.password;
		if (newPassword) {
			newPassword = await this.hasher.hash({
				plaintext: newPassword,
			});
		}

		return this.updateAccountRepository.update({
			id: params.id,
			email: params.email || currentAccount.email,
			username: params.username || currentAccount.username,
			password: newPassword || currentAccount.password,
			name: params.name || currentAccount.name,
			updatedAt: new Date(),

			twitch:
				params.twitch !== undefined
					? params.twitch
					: currentAccount.twitch,
			steam:
				params.steam !== undefined
					? params.steam
					: currentAccount.steam,
		});
	}
}
