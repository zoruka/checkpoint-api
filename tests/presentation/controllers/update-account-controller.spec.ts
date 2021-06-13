import { UpdateAccountController } from '../../../src/presentation/controllers';
import { HttpError } from '../../../src/presentation/errors';
import { throwError, throwIdentifiedError } from '../../utils';
import { UpdateAccountSpy } from '../mocks/mock-account';
import { ValidationSpy } from '../mocks/mock-validation';

const makeSut = () => {
	const validationSpy = new ValidationSpy();
	const updateAccountSpy = new UpdateAccountSpy();
	const sut = new UpdateAccountController(validationSpy, updateAccountSpy);

	return {
		sut,
		validationSpy,
		updateAccountSpy,
	};
};

describe('UpdateAccountController', () => {
	const request = {
		accountId: 'account_id',
		email: 'mail@mail.com',
		username: 'new_username',
		password: 'new_password',
		name: 'new_name',
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

	test('should return Forbidden if update throws an identified error', async () => {
		const { sut, updateAccountSpy } = makeSut();
		jest.spyOn(updateAccountSpy, 'update').mockImplementationOnce(
			throwIdentifiedError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Forbidden);
	});

	test('should return ServerError if validation throws', async () => {
		const { sut, updateAccountSpy } = makeSut();
		jest.spyOn(updateAccountSpy, 'update').mockImplementationOnce(
			throwError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Server);
	});

	test('should return an account', async () => {
		const { sut, updateAccountSpy } = makeSut();

		const result = await sut.handle(request);

		const { password, ...body } = updateAccountSpy.result as any;

		expect(result.statusCode).toEqual(200);
		expect(result.body).toEqual(body);
	});
});
