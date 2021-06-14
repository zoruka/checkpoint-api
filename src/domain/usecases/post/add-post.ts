import { Post } from '../../models';

export interface AddPost {
	add: (params: AddPost.Params) => Promise<AddPost.Result>;
}

export namespace AddPost {
	export type Params = {
		text: string;
		media?: string;
		userId: string;
		groupId: string;
	};

	export type Result = Post.Model;
}
