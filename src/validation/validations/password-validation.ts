import { Validation } from '../../presentation/protocols';
import { PasswordValidator } from '../protocols';

export class PasswordValidation implements Validation {
	constructor(
		private readonly validator: PasswordValidator,
		private readonly objectKey: string
	) {}

	async validate(input: any): Validation.Result {
		if (input[this.objectKey] === undefined) return;
		const error = await this.validator.validatePassword(
			input[this.objectKey]
		);
		if (error) return { [this.objectKey]: error };
	}
}
