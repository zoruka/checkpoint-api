import { AddPostController } from '../../../../presentation/controllers';
import { makeAddPost } from '../../usecases';
import { makeAddPostValidation } from '../../validaton';

export const makeAddPostController = (): AddPostController => {
	return new AddPostController(makeAddPostValidation(), makeAddPost());
};
