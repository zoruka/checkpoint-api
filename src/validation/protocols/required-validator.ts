export interface RequiredValidator {
	validateRequired(input: any): Promise<void | string>;
}
