import { Validation } from '../../../presentation/protocols';
import {
	CompositeValidation,
	RequiredValidation,
} from '../../../validation/validations';
import { makeRequiredValidator } from '../infras';

export const makeFindGroupAccounts = (): Validation => {
	const requiredValidator = makeRequiredValidator();

	return new CompositeValidation([
		new RequiredValidation(requiredValidator, 'groupId'),
	]);
};
