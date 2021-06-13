import { FindAccountController } from '../../../src/presentation/controllers';
import { HttpError } from '../../../src/presentation/errors';
import { throwError, throwIdentifiedError } from '../../utils';
import { FindAccountSpy } from '../mocks/mock-account';
import { ValidationSpy } from '../mocks/mock-validation';

const makeSut = () => {
	const validationSpy = new ValidationSpy();
	const findAccountSpy = new FindAccountSpy();
	const sut = new FindAccountController(validationSpy, findAccountSpy);
	return {
		sut,
		validationSpy,
		findAccountSpy,
	};
};

describe('FindAccountController', () => {
	const request = {
		id: 'account_id',
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

	test('should return ServerError if findOne throws', async () => {
		const { sut, findAccountSpy } = makeSut();
		jest.spyOn(findAccountSpy, 'findOne').mockImplementationOnce(
			throwError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Server);
	});

	test('should return Forbidden if findOne throws an identified error', async () => {
		const { sut, findAccountSpy } = makeSut();
		jest.spyOn(findAccountSpy, 'findOne').mockImplementationOnce(
			throwIdentifiedError
		);

		const result = await sut.handle(request);
		expect(result).toBeInstanceOf(HttpError.Forbidden);
	});

	test('should return an auth result', async () => {
		const { sut, findAccountSpy } = makeSut();

		const result = await sut.handle(request);

		const { password, ...body } = findAccountSpy.result as any;

		expect(result.body).toEqual(body);
		expect(result.statusCode).toEqual(200);
	});
});
