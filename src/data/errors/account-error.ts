import { BaseError } from '../../domain/errors';

export namespace AccountError {
	const type = 'AccountError';

	export class InvalidCredentials extends BaseError {
		constructor(message: string) {
			super(type, 'InvalidCredentials', message);
		}
	}

	export class EmailConflict extends BaseError {
		constructor() {
			super(type, 'EmailConflict', 'Email already in use');
		}
	}

	export class UsernameConflict extends BaseError {
		constructor() {
			super(type, 'UsernameConflict', 'Username already in use');
		}
	}
}
