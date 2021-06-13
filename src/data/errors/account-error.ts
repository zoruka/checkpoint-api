import { IdentifiedError } from '../../domain/errors';

export namespace AccountError {
	const type = 'AccountError';

	export class InvalidCredentials extends IdentifiedError {
		constructor(message: string) {
			super(type, 'InvalidCredentials', message);
		}
	}

	export class EmailConflict extends IdentifiedError {
		constructor() {
			super(type, 'EmailConflict', 'Email already in use');
		}
	}

	export class UsernameConflict extends IdentifiedError {
		constructor() {
			super(type, 'UsernameConflict', 'Username already in use');
		}
	}

	export class InvalidToken extends IdentifiedError {
		constructor(message: string = 'Invalid token') {
			super(type, 'InvalidToken', message);
		}
	}
}
