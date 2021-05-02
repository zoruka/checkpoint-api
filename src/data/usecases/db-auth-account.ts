import { AuthAccountRepository } from '../protocols/database';
import { Auth } from '../../domain/usecases';

export class DbAuthAccount implements Auth {
	constructor(private readonly addAccountRepository: AuthAccountRepository) {}

	async auth(params: Auth.Params): Promise<Auth.Result> {
		return this.addAccountRepository.auth(params);
	}
}
