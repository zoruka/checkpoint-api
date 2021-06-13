import {
	RequiredValidatorAdapter,
	StringValidatorAdapter,
} from '../../../infra/validator';

export const makeStringValidator = (): StringValidatorAdapter => {
	return new StringValidatorAdapter();
};

export const makeRequiredValidator = (): RequiredValidatorAdapter => {
	return new RequiredValidatorAdapter();
};
