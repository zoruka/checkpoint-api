import { IdentifiedError } from '../../../domain/errors';
import { Account } from '../../../domain/models';
import { FindGroupAccounts } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class FindGroupAccountsController implements Http.Controller {
	constructor(
		private readonly validation: Validation<FindGroupAccountsController.Request>,
		private readonly findGroupAccounts: FindGroupAccounts
	) {}

	async handle(
		request: FindGroupAccountsController.Request
	): Promise<Http.Response<FindGroupAccountsController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const accountShorts = await this.findGroupAccounts.findAccounts(
				request.groupId
			);

			return ok(accountShorts);
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace FindGroupAccountsController {
	export type Request = {
		groupId: string;
	};
	export type Response = Account.Short[];
}
