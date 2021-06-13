import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	EmailValidation,
	PasswordValidation,
	UsernameValidation,
} from '../../../validation/validations';
import {
	makeEmailValidator,
	makePasswordValidator,
	makeUsernameValidator,
} from '../infras';

export const makeUpdateAccountValidation = (): Validation => {
	return new CompositeValidation([
		new EmailValidation(makeEmailValidator(), 'email'),
		new PasswordValidation(makePasswordValidator(), 'password'),
		new UsernameValidation(makeUsernameValidator(), 'username'),
	]);
};
