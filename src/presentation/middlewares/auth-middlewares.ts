import { IdentifiedError } from '../../domain/errors';
import { Account } from '../../domain/models';
import { AuthByToken } from '../../domain/usecases';
import { HttpError } from '../errors';
import { ok } from '../helpers';
import { Http } from '../protocols';

export class AuthMiddleware implements Http.Middleware {
	constructor(
		private readonly authByToken: AuthByToken,
		private readonly access: Account.Access
	) {}

	async handle(request: AuthMiddleware.Request): Promise<Http.Response> {
		try {
			const { accessToken } = request;
			if (accessToken) {
				const account = await this.authByToken.authByToken(accessToken);
				if (account && account.access === this.access) {
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
