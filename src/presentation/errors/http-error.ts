import { IdentifiedError } from '../../domain/errors';
import { Http } from '../protocols';
import { Validation } from '../protocols/validation';

export namespace HttpError {
	abstract class HttpError extends IdentifiedError implements Http.Response {
		body: any;
		passing?: IdentifiedError;

		constructor(
			public readonly statusCode: number,
			name: string,
			message: string
		) {
			super('HttpError', name, message);

			this.body = {
				name,
				message,
			};
		}

		pass(e: IdentifiedError): HttpError {
			this.passing = e;
			this.body = {
				...this.body,
				type: e.name,
				message: e.message,
			};
			return this;
		}
	}

	export class BadRequest extends HttpError {
		constructor(public readonly badParams: Validation.BadParams) {
			super(400, 'BadRequest', 'Invalid request params');
			this.body['badParams'] = badParams;
		}
	}

	export class Unauthorized extends HttpError {
		constructor(message = 'You shall not pass') {
			super(401, 'UnauthorizedError', message);
		}
	}

	export class Forbidden extends HttpError {
		constructor(message = 'You are not allowed to do it') {
			super(403, 'ForbiddenError', message);
		}
	}

	export class Server extends HttpError {
		constructor(message = 'Something broke, try again later') {
			super(500, 'ServerError', message);
		}
	}
}
