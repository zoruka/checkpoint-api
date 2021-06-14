import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
	makeFindGroupByIdController,
	makeBindGroupAccountController,
	makeRegisterGroupController,
} from '../factories/controllers';
import { profileAuth } from '../middlewares/profile-auth';

export const applyGroupRoutes = (router: Router): void => {
	router.get(
		'/group/:groupId',
		profileAuth,
		adaptRoute(makeFindGroupByIdController())
	);
	router.post(
		'/group/:groupId/bind',
		profileAuth,
		adaptRoute(makeBindGroupAccountController())
	);
	router.post(
		'/group',
		profileAuth,
		adaptRoute(makeRegisterGroupController())
	);
};
