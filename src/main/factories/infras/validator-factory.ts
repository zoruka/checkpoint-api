import { StringValidatorAdapter } from '../../../infra/validator';

export const makeStringValidator = (): StringValidatorAdapter => {
	return new StringValidatorAdapter();
};
