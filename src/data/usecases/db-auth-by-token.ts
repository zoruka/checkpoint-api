import { FindAccountRepository } from '../protocols/database';
import { AuthByToken } from '../../domain/usecases';
import { Decrypter } from '../protocols';
import { AccountError } from '../errors';

export class DbAuthByToken implements AuthByToken {
	constructor(
		private readonly decrypter: Decrypter,
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async authByToken(
		accessToken: AuthByToken.Params
	): Promise<AuthByToken.Result> {
		const decryptedToken = await this.decrypter.decrypt({
			ciphertext: accessToken,
		});

		if (!decryptedToken) throw new AccountError.InvalidToken();

		const account = await this.findAccountRepository.findOne(
			decryptedToken.payload
		);

		if (!account) throw new AccountError.InvalidToken();

		return account;
	}
}
