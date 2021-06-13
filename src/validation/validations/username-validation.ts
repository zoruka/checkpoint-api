import { Validation } from '../../presentation/protocols';
import { UsernameValidator } from '../protocols';

export class UsernameValidation implements Validation {
	constructor(
		private readonly validator: UsernameValidator,
		private readonly objectKey: string
	) {}

	async validate(input: any): Validation.Result {
		if (input[this.objectKey] === undefined) return;
		const error = await this.validator.validateUsername(
			input[this.objectKey]
		);
		if (error) return { [this.objectKey]: error };
	}
}
