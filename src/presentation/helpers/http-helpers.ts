import { HttpError } from '../errors/http-error';
import { Http } from '../protocols';

export const ok = (data: any): Http.Response => {
	return {
		statusCode: 200,
		body: data,
	};
};

export const noContent = (): Http.Response => {
	return {
		statusCode: 204,
		body: null,
	};
};
