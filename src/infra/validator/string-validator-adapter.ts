import { EmailValidator } from '../../validation/protocols';

import validator from 'validator';

export class StringValidatorAdapter implements EmailValidator {
	async validateEmail(email: string): Promise<void | string> {
		return validator.isEmail(email) ? undefined : 'Invalid email';
	}
}
