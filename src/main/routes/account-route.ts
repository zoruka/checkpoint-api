import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeRegisterAccountController } from '../factories/controllers';

export const applyAccountRoutes = (router: Router): void => {
	router.post('/register', adaptRoute(makeRegisterAccountController()));
};
