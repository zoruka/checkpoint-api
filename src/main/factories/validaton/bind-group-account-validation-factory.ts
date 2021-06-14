import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	RequiredValidation,
} from '../../../validation/validations';
import { makeRequiredValidator } from '../infras';

export const makeBindGroupAccountValidation = (): Validation => {
	const requiredValidator = makeRequiredValidator();

	return new CompositeValidation([
		new RequiredValidation(requiredValidator, 'accountId'),
		new RequiredValidation(requiredValidator, 'groupId'),
		new RequiredValidation(requiredValidator, 'bind'),
	]);
};
