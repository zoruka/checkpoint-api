import { Http } from '../../presentation/protocols';

import { Request, Response } from 'express';

export const adaptRoute = (controller: Http.Controller) => {
	return async (req: Request, res: Response) => {
		const request = {
			...(req.body || {}),
			...(req.params || {}),
			...(req.query || {}),
		};
		const httpResponse = await controller.handle(request);
		res.status(httpResponse.statusCode).json(httpResponse.body);
	};
};
