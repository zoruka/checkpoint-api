export abstract class BaseError extends Error {
	constructor(public type: string, public name: string, message: string) {
		super(message);
	}
}
