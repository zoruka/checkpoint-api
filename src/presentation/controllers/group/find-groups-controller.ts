import { IdentifiedError } from '../../../domain/errors';
import { Group } from '../../../domain/models';
import { FindGroups } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class FindGroupsController implements Http.Controller {
	constructor(
		private readonly validation: Validation<FindGroupsController.Request>,
		private readonly findGroups: FindGroups
	) {}

	async handle(
		request: FindGroupsController.Request
	): Promise<Http.Response<FindGroupsController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const group = await this.findGroups.find(request.search || '');

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

export namespace FindGroupsController {
	export type Request = {
		search?: string;
	};
	export type Response = Group.Model[];
}
