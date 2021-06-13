import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	EmailValidation,
	PasswordValidation,
	RequiredValidation,
	UsernameValidation,
} from '../../../validation/validations';
import {
	makeRequiredValidator,
	makeEmailValidator,
	makeUsernameValidator,
	makePasswordValidator,
} from '../infras/validator-factory';

export const makeRegisterAccountValidation = (): Validation => {
	const emailValidator = makeEmailValidator();
	const usernameValidator = makeUsernameValidator();
	const requiredValidator = makeRequiredValidator();
	const passwordValidator = makePasswordValidator();

	return new CompositeValidation([
		new RequiredValidation(requiredValidator, 'email'),
		new RequiredValidation(requiredValidator, 'username'),
		new RequiredValidation(requiredValidator, 'password'),
		new RequiredValidation(requiredValidator, 'name'),

		new EmailValidation(emailValidator, 'email'),
		new UsernameValidation(usernameValidator, 'username'),
		new PasswordValidation(passwordValidator, 'password'),
	]);
};
