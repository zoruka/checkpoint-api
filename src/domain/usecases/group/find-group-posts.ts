import { Account, Post } from '../../models';

export interface FindGroupPosts {
	findPosts: (id: FindGroupPosts.Params) => Promise<FindGroupPosts.Result>;
}

export namespace FindGroupPosts {
	export type Params = string;

	export type Result = ({
		account: Account.Short;
	} & Omit<Post.Model, 'accountId'>)[];
}
