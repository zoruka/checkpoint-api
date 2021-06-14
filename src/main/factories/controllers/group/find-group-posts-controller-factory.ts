import { FindGroupPostsController } from '../../../../presentation/controllers';
import { makeFindGroupPosts } from '../../usecases';
import { makeFindGroupPostsValidation } from '../../validaton';

export const makeFindGroupPostsController = (): FindGroupPostsController => {
	return new FindGroupPostsController(
		makeFindGroupPostsValidation(),
		makeFindGroupPosts()
	);
};
