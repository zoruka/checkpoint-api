import { Http } from '../../presentation/protocols';

import { Request, Response, NextFunction } from 'express';

export const adaptMiddleware = (middleware: Http.Middleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const request = {
			accessToken: req.headers?.['x-access-token'],
			...(req.headers || {}),
		};
		const httpResponse = await middleware.handle(request);
		if (httpResponse.statusCode === 200) {
			Object.assign(req.body, httpResponse.body);
			next();
		} else {
			res.status(httpResponse.statusCode).json(httpResponse.body);
		}
	};
};
