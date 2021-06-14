import { IdentifiedError } from '../../../domain/errors';
import { Post } from '../../../domain/models';
import { AddPost } from '../../../domain/usecases';
import { HttpError } from '../../errors';
import { ok } from '../../helpers';
import { Http } from '../../protocols';
import { Validation } from '../../protocols/validation';

export class AddPostController implements Http.Controller {
	constructor(
		private readonly validation: Validation<AddPostController.Request>,
		private readonly addPost: AddPost
	) {}

	async handle(request: AddPostController.Request): Promise<Http.Response> {
		try {
			const badParams = await this.validation.validate(request);
			if (badParams) return new HttpError.BadRequest(badParams);

			const result = await this.addPost.add(request);

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

export namespace AddPostController {
	export type Request = {
		text: string;
		media?: string;
		accountId: string;
		groupId: string;
	};

	export type Response = Post.Model;
}
