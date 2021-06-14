import { IdentifiedError } from '../../../domain/errors';
import { Account, Group } from '../../../domain/models';
import { FindAccount, FindAccountGroups } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http } from '../../protocols';
import { Validation } from '../../protocols/validation';

export class FindAccountGroupsController implements Http.Controller {
	constructor(
		private readonly validation: Validation<FindAccountGroupsController.Request>,
		private readonly findAccountGroups: FindAccountGroups
	) {}

	async handle(
		request: FindAccountGroupsController.Request
	): Promise<Http.Response> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const groups = await this.findAccountGroups.findAccountGroups(
				request.accountId
			);

			return ok(groups);
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace FindAccountGroupsController {
	export type Request = {
		accountId: string;
	};

	export type Response = Group.Model[];
}
