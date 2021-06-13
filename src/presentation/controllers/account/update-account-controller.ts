import { IdentifiedError } from '../../../domain/errors';
import { UpdateAccount } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class UpdateAccountController implements Http.Controller {
	constructor(
		private readonly validation: Validation<UpdateAccountController.Request>,
		private readonly updateAccount: UpdateAccount
	) {}

	async handle(
		request: UpdateAccountController.Request
	): Promise<Http.Response> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const authResult = await this.updateAccount.update({
				id: request.accountId,
				email: request.email,
				name: request.name,
				password: request.password,
				username: request.username,
			});

			return ok(authResult);
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace UpdateAccountController {
	export type Request = {
		accountId: string;

		email?: string;
		username?: string;
		password?: string;
		name?: string;
	};
}
