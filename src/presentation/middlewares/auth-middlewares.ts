import { Decrypter } from '../../data/protocols';
import { IdentifiedError } from '../../domain/errors';
import { Account } from '../../domain/models';
import { FindAccount } from '../../domain/usecases';
import { HttpError } from '../errors';
import { ok } from '../helpers';
import { Http } from '../protocols';

export class AuthMiddleware implements Http.Middleware {
	constructor(
		private readonly decrypter: Decrypter,
		private readonly findAccount: FindAccount,
		private readonly access: Account.Access
	) {}

	async handle(request: AuthMiddleware.Request): Promise<Http.Response> {
		try {
			const { accessToken } = request;
			if (accessToken) {
				const { payload } = await this.decrypter.decrypt({
					ciphertext: accessToken,
				});
				const account = await this.findAccount.findOne({ id: payload });
				if (account.access === this.access) {
					return ok({ account });
				}
			}

			return new HttpError.Unauthorized();
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			}

			return new HttpError.Server(e.message);
		}
	}
}

export namespace AuthMiddleware {
	export type Request = {
		accessToken?: string;
	};
}
