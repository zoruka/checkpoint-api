import { IdentifiedError } from '../../../domain/errors';
import { Group } from '../../../domain/models';
import { BindGroupAccount } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { noContent } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class BindGroupController implements Http.Controller {
	constructor(
		private readonly validation: Validation<BindGroupController.Request>,
		private readonly bindGroupAccount: BindGroupAccount
	) {}

	async handle(
		request: BindGroupController.Request
	): Promise<Http.Response<BindGroupController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			await this.bindGroupAccount.bindAccountId(request);

			return noContent();
		} catch (e) {
			if (e instanceof IdentifiedError) {
				return new HttpError.Forbidden().pass(e);
			} else {
				return new HttpError.Server();
			}
		}
	}
}

export namespace BindGroupController {
	export type Request = {
		accountId: string;
		groupId: string;
		bind: boolean;
	};
	export type Response = Group.Model;
}
