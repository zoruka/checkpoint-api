import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	EmailValidation,
} from '../../../validation/validations';
import { makeStringValidator } from '../infras/validator-factory';

export const makeRegisterAccountValidation = (): Validation => {
	const stringValidator = makeStringValidator();

	return new CompositeValidation([
		new EmailValidation(stringValidator, 'email'),
	]);
};
