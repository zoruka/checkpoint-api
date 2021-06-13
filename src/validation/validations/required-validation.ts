import { Validation } from '../../presentation/protocols';
import { RequiredValidator } from '../protocols';

export class RequiredValidation implements Validation {
	constructor(
		private readonly emailValidator: RequiredValidator,
		private readonly objectKey: string
	) {}

	async validate(input: any): Validation.Result {
		const error = await this.emailValidator.validateRequired(
			input[this.objectKey]
		);
		if (error) return { [this.objectKey]: error };
	}
}
