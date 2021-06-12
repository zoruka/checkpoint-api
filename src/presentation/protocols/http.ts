export namespace Http {
	export type Response = {
		statusCode: number;
		body: any;
	};

	export interface Controller<T = any> {
		handle: (request: T) => Promise<Response>;
	}

	export interface Middleware<T = any> {
		handle: (request: T) => Promise<Response>;
	}
}
