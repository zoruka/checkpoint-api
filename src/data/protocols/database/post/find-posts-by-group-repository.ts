import { Post } from '../../../../domain/models';

export interface FindPostsByGroupRepository {
	findByGroup: (
		groupId: FindPostsByGroupRepository.Params
	) => Promise<FindPostsByGroupRepository.Result>;
}

export namespace FindPostsByGroupRepository {
	export type Params = string;
	export type Result = Post.Model[];
}
