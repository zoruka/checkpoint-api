import { IdentifiedError } from '../../../domain/errors';
import { Auth } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class AuthAccountController implements Http.Controller {
	constructor(
		private readonly validation: Validation<AuthAccountController.Request>,
		private readonly auth: Auth
	) {}

	async handle(
		request: AuthAccountController.Request
	): Promise<Http.Response> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const authResult = await this.auth.auth({
				username: request.username,
				password: request.password,
			});

			return ok(authResult);
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Unauthorized().pass(e);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace AuthAccountController {
	export type Request = {
		username: string;
		password: string;
	};

	export type Response = Auth.Result;
}
