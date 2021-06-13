import { Validation } from '../../presentation/protocols';
import { RequiredValidator } from '../protocols';

export class RequiredValidation implements Validation {
	constructor(
		private readonly validator: RequiredValidator,
		private readonly objectKey: string
	) {}

	async validate(input: any): Validation.Result {
		const error = await this.validator.validateRequired(
			input[this.objectKey]
		);
		if (error) return { [this.objectKey]: error };
	}
}
