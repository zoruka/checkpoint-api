import {
	RequiredValidatorAdapter,
	EmailValidatorAdapter,
	UsernameValidatorAdapter,
	PasswordValidatorAdapter,
} from '../../../infra/validator';
import {
	PasswordValidator,
	UsernameValidator,
} from '../../../validation/protocols';

export const makeEmailValidator = (): EmailValidatorAdapter => {
	return new EmailValidatorAdapter();
};

export const makeRequiredValidator = (): RequiredValidatorAdapter => {
	return new RequiredValidatorAdapter();
};

export const makeUsernameValidator = (): UsernameValidator => {
	return new UsernameValidatorAdapter();
};

export const makePasswordValidator = (): PasswordValidator => {
	return new PasswordValidatorAdapter();
};
