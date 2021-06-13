import {
	EmailValidator,
	PasswordValidator,
	UsernameValidator,
} from '../../validation/protocols';

import validator from 'validator';

export class EmailValidatorAdapter implements EmailValidator {
	async validateEmail(email: string): Promise<void | string> {
		if (!validator.isEmail(email)) return 'invalid';
	}
}

export class UsernameValidatorAdapter implements UsernameValidator {
	async validateUsername(username: string): Promise<void | string> {
		if (username.length < 3) return 'minLength=3';
		if (username.length > 12) return 'maxLength=12';
		if (!/[a-zA-Z0-9_]{3,12}/.test(username)) return 'regex';
	}
}

export class PasswordValidatorAdapter implements PasswordValidator {
	async validatePassword(password: string): Promise<void | string> {
		if (password.length < 8) return 'minLength=8';
		if (!/[a-zA-Z0-9_!@#$%^&*-]{8,}/.test(password)) return 'regex';
	}
}
