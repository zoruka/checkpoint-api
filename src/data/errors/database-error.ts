import { IdentifiedError } from '../../domain/errors';

export namespace DatabaseError {
	const type = 'DatabaseError';

	export class NotFound extends IdentifiedError {
		constructor(message: string) {
			super(type, 'NotFound', message);
		}
	}
}
