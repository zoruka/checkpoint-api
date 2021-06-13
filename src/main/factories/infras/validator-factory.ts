import {
	RequiredValidatorAdapter,
	EmailValidatorAdapter,
	UsernameValidatorAdapter,
} from '../../../infra/validator';
import { UsernameValidator } from '../../../validation/protocols';

export const makeEmailValidator = (): EmailValidatorAdapter => {
	return new EmailValidatorAdapter();
};

export const makeRequiredValidator = (): RequiredValidatorAdapter => {
	return new RequiredValidatorAdapter();
};

export const makeUsernameValidator = (): UsernameValidator => {
	return new UsernameValidatorAdapter();
};
