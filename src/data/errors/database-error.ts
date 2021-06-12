import { BaseError } from '../../domain/errors';

export namespace DatabaseError {
	const type = 'DatabaseError';

	export class NotFound extends BaseError {
		constructor(message: string) {
			super(type, 'NotFound', message);
		}
	}
}
