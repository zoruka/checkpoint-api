import { Validation } from '../../presentation/protocols';
import { EmailValidator } from '../protocols';

export class EmailValidation implements Validation {
	constructor(
		private readonly emailValidator: EmailValidator,
		private readonly objectKey: string
	) {}

	async validate(input: any): Validation.Result {
		const error = await this.emailValidator.validateEmail(
			input[this.objectKey]
		);
		if (error) return { [this.objectKey]: error };
	}
}
