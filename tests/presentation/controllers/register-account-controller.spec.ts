import { RegisterAccountController } from '../../../src/presentation/controllers';
import { HttpError } from '../../../src/presentation/errors';
import { AddAccountSpy, AuthSpy } from '../mocks/mock-account';
import { ValidationSpy } from '../mocks/mock-validation';
import { throwError, throwIdentifiedError } from '../../utils';

const makeSut = () => {
	const validationSpy = new ValidationSpy();
	const addAccountSpy = new AddAccountSpy();
	const authSpy = new AuthSpy();
	const sut = new RegisterAccountController(
		validationSpy,
		addAccountSpy,
		authSpy
	);
	return {
		sut,
		validationSpy,
		addAccountSpy,
		authSpy,
	};
};

describe('RegisterAccountController', () => {
	const request = {
		username: 'username',
		name: 'name',
		password: 'password',
		email: 'mail@mail.com',
	};

	test('should return BadRequest if has bad params', async () => {
		const { sut, validationSpy } = makeSut();
		jest.spyOn(validationSpy, 'validate').mockResolvedValue({
			param: 'error',
		});

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.BadRequest);
	});

	test('should return ServerError if validation throws', async () => {
		const { sut, validationSpy } = makeSut();
		jest.spyOn(validationSpy, 'validate').mockImplementationOnce(
			throwError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Server);
	});

	test('should return Forbidden if a identified error is thrown', async () => {
		const { sut, addAccountSpy } = makeSut();
		jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(
			throwIdentifiedError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Forbidden);
	});

	test('should return ServerError if add throws', async () => {
		const { sut, addAccountSpy } = makeSut();
		jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Server);
	});

	test('should return Unauthorized if auth throws a identified error', async () => {
		const { sut, authSpy } = makeSut();
		jest.spyOn(authSpy, 'auth').mockImplementationOnce(
			throwIdentifiedError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Unauthorized);
	});

	test('should return ServerError if auth throws', async () => {
		const { sut, authSpy } = makeSut();
		jest.spyOn(authSpy, 'auth').mockImplementationOnce(throwError);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Server);
	});

	test('should return an auth result', async () => {
		const { sut, authSpy } = makeSut();

		const result = await sut.handle(request);
		expect(result.body).toEqual(authSpy.result);
		expect(result.statusCode).toEqual(200);
	});
});
