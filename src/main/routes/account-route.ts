import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
	makeAuthAccountController,
	makeFindAccountController,
	makeRegisterAccountController,
	makeUpdateAccountController,
} from '../factories/controllers';
import { profileAuth } from '../middlewares/profile-auth';

export const applyAccountRoutes = (router: Router): void => {
	router.post('/register', adaptRoute(makeRegisterAccountController()));
	router.post('/auth', adaptRoute(makeAuthAccountController()));
	router.get('/account/:id', adaptRoute(makeFindAccountController()));
	router.put(
		'/account',
		profileAuth,
		adaptRoute(makeUpdateAccountController())
	);
};
