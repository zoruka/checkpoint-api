import { Router } from 'express';
import { adaptRoute } from '../adapters';

export const applyAccountRoutes = (router: Router): void => {
	router.post('/register', adaptRoute('' as any));
};
