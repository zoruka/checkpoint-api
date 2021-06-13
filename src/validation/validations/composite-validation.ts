import { Validation } from '../../presentation/protocols';

export class CompositeValidation implements Validation {
	constructor(private readonly validations: Validation[]) {}

	async validate(input: any): Validation.Result {
		let result: Validation.BadParams = {};
		for (const validation of this.validations) {
			const error = await validation.validate(input);

			if (error) {
				result = {
					...result,
					...error,
				};
			}
		}

		if (Object.keys(result)) return result;
	}
}
