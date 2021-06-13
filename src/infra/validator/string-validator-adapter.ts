import { EmailValidator, UsernameValidator } from '../../validation/protocols';

import validator from 'validator';

export class StringValidatorAdapter implements EmailValidator {
	async validateEmail(email: string): Promise<void | string> {
		if (!validator.isEmail(email)) return 'invalid';
	}
}

export class UsernameValidatorAdapter implements UsernameValidator {
	async validateUsername(username: string): Promise<void | string> {
		if (username.length < 3) return 'minLength=3';
		if (username.length > 12) return 'maxLength=12';
		if (!/[a-zA-Z0-9_]/g.test(username)) return 'specialCharacter';
	}
}
