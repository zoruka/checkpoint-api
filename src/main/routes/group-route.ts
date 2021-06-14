import { Router } from 'express';
import { adaptRoute } from '../adapters';
import {
	makeFindGroupByIdController,
	makeBindGroupAccountController,
	makeRegisterGroupController,
	makeFindGroupAccountsController,
	makeFindGroupPostsController,
} from '../factories/controllers';
import { makeFindGroupsController } from '../factories/controllers/group/find-groups-controller-factory';
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
	router.get(
		'/group/:groupId/accounts',
		profileAuth,
		adaptRoute(makeFindGroupAccountsController())
	);
	router.get(
		'/group/:groupId/posts',
		profileAuth,
		adaptRoute(makeFindGroupPostsController())
	);
	router.get('/groups', profileAuth, adaptRoute(makeFindGroupsController()));
};
