import { Validation } from '../../../presentation/protocols';
import { CompositeValidation } from '../../../validation/validations';

export const makeFindGroupsValidation = (): Validation => {
	return new CompositeValidation([]);
};
