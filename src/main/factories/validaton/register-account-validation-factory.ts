import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	EmailValidation,
	RequiredValidation,
	UsernameValidation,
} from '../../../validation/validations';
import {
	makeRequiredValidator,
	makeEmailValidator,
	makeUsernameValidator,
} from '../infras/validator-factory';

export const makeRegisterAccountValidation = (): Validation => {
	const emailValidator = makeEmailValidator();
	const usernameValidator = makeUsernameValidator();
	const requiredValidator = makeRequiredValidator();

	return new CompositeValidation([
		new EmailValidation(emailValidator, 'email'),
		new RequiredValidation(requiredValidator, 'email'),

		new UsernameValidation(usernameValidator, 'username'),
		new RequiredValidation(requiredValidator, 'username'),

		new RequiredValidation(requiredValidator, 'password'),

		new RequiredValidation(requiredValidator, 'name'),
	]);
};
