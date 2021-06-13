export interface PasswordValidator {
	validatePassword(input: any): Promise<void | string>;
}
