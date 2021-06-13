import * as middlewares from '../middlewares';

import { Express } from 'express';

export default (app: Express): void => {
	for (const middleware of Object.values(middlewares)) {
		app.use(middleware);
	}
};
