import { IdentifiedError } from '../../../domain/errors';
import { Account } from '../../../domain/models';
import { FindGroupAccounts, FindGroupById } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class FindGroupByIdController implements Http.Controller {
	constructor(
		private readonly validation: Validation<FindGroupByIdController.Request>,
		private readonly findGroupById: FindGroupById
	) {}

	async handle(
		request: FindGroupByIdController.Request
	): Promise<Http.Response<FindGroupByIdController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const group = await this.findGroupById.findById(request.groupId);

			return ok(group);
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace FindGroupByIdController {
	export type Request = {
		groupId: string;
	};
	export type Response = Account.Short[];
}
