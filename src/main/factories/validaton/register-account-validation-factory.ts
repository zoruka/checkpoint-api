import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	EmailValidation,
	RequiredValidation,
} from '../../../validation/validations';
import {
	makeRequiredValidator,
	makeStringValidator,
} from '../infras/validator-factory';

export const makeRegisterAccountValidation = (): Validation => {
	const stringValidator = makeStringValidator();
	const requiredValidator = makeRequiredValidator();

	return new CompositeValidation([
		new EmailValidation(stringValidator, 'email'),
		new RequiredValidation(requiredValidator, 'email'),

		new RequiredValidation(requiredValidator, 'username'),

		new RequiredValidation(requiredValidator, 'password'),

		new RequiredValidation(requiredValidator, 'name'),
	]);
};
