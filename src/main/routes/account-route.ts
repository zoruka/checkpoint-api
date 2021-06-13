import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
	makeAuthAccountController,
	makeFindAccountController,
	makeRegisterAccountController,
} from '../factories/controllers';

export const applyAccountRoutes = (router: Router): void => {
	router.post('/register', adaptRoute(makeRegisterAccountController()));
	router.post('/auth', adaptRoute(makeAuthAccountController()));
	router.get('/account/:id', adaptRoute(makeFindAccountController()));
};
