import { IdentifiedError } from '../../src/domain/errors';

export const throwError = (): never => {
	throw new Error();
};

class IdentifiedErrorMock extends IdentifiedError {}

export const throwIdentifiedError = (): never => {
	throw new IdentifiedErrorMock('mock', 'mock', 'mock');
};
