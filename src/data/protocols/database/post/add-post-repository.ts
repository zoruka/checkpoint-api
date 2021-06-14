import { Post } from '../../../../domain/models';

export interface AddPostRepository {
	add: (
		params: AddPostRepository.Params
	) => Promise<AddPostRepository.Result>;
}

export namespace AddPostRepository {
	export type Params = Omit<Post.Model, 'id'>;
	export type Result = Post.Model;
}
