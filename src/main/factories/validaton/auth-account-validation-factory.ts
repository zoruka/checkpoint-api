import { RequiredValidatorAdapter } from '../../../infra/validator';
import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	RequiredValidation,
} from '../../../validation/validations';

export const makeAuthAccountValidation = (): Validation => {
	const requiredValidator = new RequiredValidatorAdapter();

	return new CompositeValidation([
		new RequiredValidation(requiredValidator, 'username'),
		new RequiredValidation(requiredValidator, 'password'),
	]);
};
