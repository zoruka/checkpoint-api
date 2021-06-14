import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeAddPostController } from '../factories/controllers/post/add-post-controller-factory';
import { profileAuth } from '../middlewares/profile-auth';

export const applyPostRoutes = (router: Router): void => {
	router.post('/post', profileAuth, adaptRoute(makeAddPostController()));
};
