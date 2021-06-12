export interface Validation<T = any> {
	validate(input: T): Validation.Result;
}

export namespace Validation {
	export type BadParams = { [param: string]: string };

	export type Result = Promise<void | Validation.BadParams>;
}
