import * as express from 'express';
import setupRoutes from './routes';
import setupMiddlewares from './middelwares';

export const buildApp = async (): Promise<express.Express> => {
	const app = express();
	setupMiddlewares(app);
	setupRoutes(app);
	return app;
};
