import { Validation } from '../../../src/presentation/protocols/validation';

export class ValidationSpy implements Validation {
	async validate(): Validation.Result {
		return;
	}
}
