import { IdentifiedError } from '../../../domain/errors';
import { Group } from '../../../domain/models';
import { AddGroup } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class RegisterGroupController implements Http.Controller {
	constructor(
		private readonly validation: Validation<RegisterGroupController.Request>,
		private readonly addGroup: AddGroup
	) {}

	async handle(
		request: RegisterGroupController.Request
	): Promise<Http.Response<RegisterGroupController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const result = await this.addGroup.add({
				adminId: request.accountId,
				name: request.name,
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

export namespace RegisterGroupController {
	export type Request = {
		accountId: string;
		name: string;
	};
	export type Response = Group.Model;
}
