export namespace Http {
	export type Response<T = any> = {
		statusCode: number;
		body: T;
	};

	export interface Controller<T = any> {
		handle: (request: T) => Promise<Response>;
	}

	export interface Middleware<T = any> {
		handle: (request: T) => Promise<Response>;
	}
}
