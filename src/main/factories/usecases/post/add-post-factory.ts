import { DbAddPost } from '../../../../data/usecases';
import { AddPost } from '../../../../domain/usecases';
import {
	makeMongoAccountRepository,
	makeMongoGroupRepository,
	makeMongoPostRepository,
} from '../../infras';

export const makeAddPost = (): AddPost => {
	const accountRepository = makeMongoAccountRepository();
	const postRepository = makeMongoPostRepository();
	const groupRepository = makeMongoGroupRepository();

	return new DbAddPost(postRepository, accountRepository, groupRepository);
};
