export interface EmailValidator {
	validateEmail(email: string): Promise<void | string>;
}
