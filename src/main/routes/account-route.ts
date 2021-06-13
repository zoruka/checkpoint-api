import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
	makeAuthAccountController,
	makeRegisterAccountController,
} from '../factories/controllers';

export const applyAccountRoutes = (router: Router): void => {
	router.post('/register', adaptRoute(makeRegisterAccountController()));
	router.post('/auth', adaptRoute(makeAuthAccountController()));
};
