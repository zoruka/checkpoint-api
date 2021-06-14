import { Post } from '../../../../domain/models';

export interface FindPostRepository {
	findByGroup: (
		groupId: FindPostRepository.Params
	) => Promise<FindPostRepository.Result>;
}

export namespace FindPostRepository {
	export type Params = string;
	export type Result = Post.Model[];
}
