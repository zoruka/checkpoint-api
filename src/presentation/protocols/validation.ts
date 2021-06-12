export interface Validation<T = any> {
	validate(input: T): Promise<void | Validation.BadParams>;
}

export namespace Validation {
	export type BadParams = { [param: string]: string };
}
