import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
	makeAuthAccountController,
	makeFindAccountController,
	makeFindAccountGroupsController,
	makeRegisterAccountController,
	makeUpdateAccountController,
} from '../factories/controllers';
import { profileAuth } from '../middlewares/profile-auth';

export const applyAccountRoutes = (router: Router): void => {
	router.post('/register', adaptRoute(makeRegisterAccountController()));
	router.post('/auth', adaptRoute(makeAuthAccountController()));
	router.get('/account/:accountId', adaptRoute(makeFindAccountController()));

	router.get('/me', profileAuth, adaptRoute(makeFindAccountController()));
	router.put('/me', profileAuth, adaptRoute(makeUpdateAccountController()));
	router.get(
		'/me/groups',
		profileAuth,
		adaptRoute(makeFindAccountGroupsController())
	);
};
