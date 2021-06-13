import { RequiredValidator } from '../../validation/protocols';

export class RequiredValidatorAdapter implements RequiredValidator {
	async validateRequired(input: any): Promise<void | string> {
		if (input === undefined) return 'Required';
	}
}
