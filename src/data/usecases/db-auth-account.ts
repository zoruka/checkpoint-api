import { FindAccountByUsernameRepository } from '../protocols/database';
import { Auth } from '../../domain/usecases';
import { Encrypter, HashComparer } from '../protocols';
import { AccountError } from '../errors';

export class DbAuthAccount implements Auth {
	constructor(
		private readonly findAccountByUsernameRepository: FindAccountByUsernameRepository,
		private readonly hashComparer: HashComparer,
		private readonly encrypter: Encrypter
	) {}

	async auth(params: Auth.Params): Promise<Auth.Result> {
		const user = await this.findAccountByUsernameRepository.findByUsername(
			params.username
		);

		if (!user)
			throw new AccountError.InvalidCredentials(
				'Invalid username or password'
			);

		const isValidPassword = await this.hashComparer.compare({
			plaintext: params.password,
			digest: user.password,
		});

		if (!isValidPassword)
			throw new AccountError.InvalidCredentials(
				'Invalid username or password'
			);

		const accessToken = await this.encrypter.encrypt({
			plaintext: user.id,
		});

		return {
			userId: user.id,
			name: user.name,
			accessToken,
		};
	}
}
