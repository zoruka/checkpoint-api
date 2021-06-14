import { IdentifiedError } from '../../../domain/errors';
import { Account } from '../../../domain/models';
import { FindGroupAccounts, FindGroupPosts } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http, Validation } from '../../protocols';

export class FindGroupPostsController implements Http.Controller {
	constructor(
		private readonly validation: Validation<FindGroupPostsController.Request>,
		private readonly findGroupPosts: FindGroupPosts
	) {}

	async handle(
		request: FindGroupPostsController.Request
	): Promise<Http.Response<FindGroupPostsController.Response>> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const accountShorts = await this.findGroupPosts.findPosts(
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

export namespace FindGroupPostsController {
	export type Request = {
		groupId: string;
	};
	export type Response = FindGroupPosts.Result;
}
