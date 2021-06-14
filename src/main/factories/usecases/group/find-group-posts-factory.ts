import { DbFindGroupPosts } from '../../../../data/usecases';
import { FindGroupPosts } from '../../../../domain/usecases';
import {
	makeMongoAccountRepository,
	makeMongoGroupRepository,
	makeMongoPostRepository,
} from '../../infras';

export const makeFindGroupPosts = (): FindGroupPosts => {
	const groupRepository = makeMongoGroupRepository();
	const accountRepository = makeMongoAccountRepository();
	const postRepository = makeMongoPostRepository();
	return new DbFindGroupPosts(
		postRepository,
		groupRepository,
		accountRepository
	);
};
