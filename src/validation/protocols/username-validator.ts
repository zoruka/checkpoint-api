export interface UsernameValidator {
	validateUsername(input: any): Promise<void | string>;
}
