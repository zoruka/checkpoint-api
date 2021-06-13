import { Account } from '../../../src/domain/models';
import { HttpError } from '../../../src/presentation/errors';
import { AuthMiddleware } from '../../../src/presentation/middlewares';
import { mockAccount } from '../../domain/mocks';
import { throwError, throwIdentifiedError } from '../../utils';
import { AuthByTokenSpy } from '../mocks/mock-account';

const makeSut = () => {
	const authByTokenSpy = new AuthByTokenSpy();
	const sut = new AuthMiddleware(authByTokenSpy, Account.Access.Profile);

	return {
		sut,
		authByTokenSpy,
	};
};

describe('AuthMiddleware', () => {
	const request = {
		accessToken: 'accessToken',
	};

	test('should return ServerError if authByToken throws', async () => {
		const { sut, authByTokenSpy } = makeSut();
		jest.spyOn(authByTokenSpy, 'authByToken').mockImplementationOnce(
			throwError
		);

		const result = await sut.handle(request);

		expect(result).toBeInstanceOf(HttpError.Server);
	});

	test('should return return ForbiddenError if authByToken throws an identified error', async () => {
		const { sut, authByTokenSpy } = makeSut();
		jest.spyOn(authByTokenSpy, 'authByToken').mockImplementationOnce(
			throwIdentifiedError
		);

		const result = await sut.handle(request);

		expect(result).toBeInstanceOf(HttpError.Forbidden);
	});

	test('should return return UnauthorizedError if access did not match', async () => {
		const { sut, authByTokenSpy } = makeSut();
		jest.spyOn(authByTokenSpy, 'authByToken').mockResolvedValueOnce({
			...mockAccount(),
			access: Account.Access.Admin,
		});

		const result = await sut.handle(request);

		expect(result).toBeInstanceOf(HttpError.Unauthorized);
	});

	test('should return return UnauthorizedError if access did not match', async () => {
		const { sut, authByTokenSpy } = makeSut();
		jest.spyOn(authByTokenSpy, 'authByToken').mockResolvedValueOnce(
			undefined as any
		);

		const result = await sut.handle(request);

		expect(result).toBeInstanceOf(HttpError.Unauthorized);
	});

	test('should return an account id', async () => {
		const { sut, authByTokenSpy } = makeSut();

		const result = await sut.handle(request);

		expect(result.statusCode).toEqual(200);
		expect(result.body).toMatchObject({
			accountId: authByTokenSpy.result?.id,
		});
	});
});
