import { Express, Router } from 'express';
import * as routes from '../routes';

export default (app: Express): void => {
	const router = Router();
	app.use('/api', router);

	for (const applyRoute of Object.values(routes)) {
		applyRoute(router);
	}
};
