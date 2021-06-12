export abstract class IdentifiedError extends Error {
	constructor(public type: string, public name: string, message: string) {
		super(message);
	}
}
