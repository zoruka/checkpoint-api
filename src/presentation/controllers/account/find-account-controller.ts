import { IdentifiedError } from '../../../domain/errors';
import { Account } from '../../../domain/models';
import { FindAccount } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http } from '../../protocols';
import { Validation } from '../../protocols/validation';

export class FindAccountController implements Http.Controller {
	constructor(
		private readonly validation: Validation<FindAccountController.Request>,
		private readonly findAccount: FindAccount
	) {}

	async handle(
		request: FindAccountController.Request
	): Promise<Http.Response> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const { password, ...result } = await this.findAccount.findOne({
				id: request.id,
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

export namespace FindAccountController {
	export type Request = {
		id: string;
	};

	export type Response = Omit<Account.Model, 'password'>;
}
