import { IdentifiedError } from '../../../domain/errors';
import { Account } from '../../../domain/models';
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
	): Promise<Http.Response<UpdateAccountController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const { password, ...result } = await this.updateAccount.update({
				id: request.accountId,
				email: request.email,
				name: request.name,
				password: request.password,
				username: request.username,
				twitch: request.twitch,
				steam: request.steam,
			});

			return ok(result);
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
		twitch?: string;
		steam?: string;
	};

	export type Response = Omit<Account.Model, 'password'>;
}
