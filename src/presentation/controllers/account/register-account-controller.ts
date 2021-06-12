import { IdentifiedError } from '../../../domain/errors';
import { Account } from '../../../domain/models';
import { AddAccount, Auth } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http } from '../../protocols';
import { Validation } from '../../protocols/validation';

export class RegisterAccountController implements Http.Controller {
	constructor(
		private readonly validation: Validation<RegisterAccountController.Request>,
		private readonly addAccount: AddAccount,
		private readonly auth: Auth
	) {}

	async handle(
		request: RegisterAccountController.Request
	): Promise<Http.Response> {
		const badParams = await this.validation.validate(request);
		if (badParams) return new HttpError.BadRequest(badParams);

		try {
			await this.addAccount.add({
				...request,
				access: Account.Access.Profile,
				avatarPath: null,
			});
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			} else {
				return new HttpError.Server();
			}
		}

		try {
			const authResult = this.auth.auth({
				username: request.username,
				password: request.password,
			});

			return ok(authResult);
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Unauthorized(e.message);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace RegisterAccountController {
	export type Request = {
		username: string;
		name: string;
		password: string;
		email: string;
	};

	export type Response = Auth.Result;
}