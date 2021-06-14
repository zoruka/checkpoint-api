import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	RequiredValidation,
} from '../../../validation/validations';
import { makeRequiredValidator } from '../infras';

export const makeAddPostValidation = (): Validation => {
	const requiredValidator = makeRequiredValidator();

	return new CompositeValidation([
		new RequiredValidation(requiredValidator, 'text'),
		new RequiredValidation(requiredValidator, 'accountId'),
		new RequiredValidation(requiredValidator, 'groupId'),
	]);
};
