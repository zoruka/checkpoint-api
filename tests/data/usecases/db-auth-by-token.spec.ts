import { DbAuthByToken } from '../../../src/data/usecases';
import { DecrypterSpy } from '../mocks/crypto-mocks';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';
import { throwError } from '../../utils';
import { AccountError } from '../../../src/data/errors';

const makeSut = () => {
	const decrypterSpy = new DecrypterSpy();
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const sut = new DbAuthByToken(decrypterSpy, findAccountRepositorySpy);

	return {
		sut,
		decrypterSpy,
		findAccountRepositorySpy,
	};
};

describe('DbAuthByToken', () => {
	const accessToken = 'access_token';

	test('should throw if decrypter throws', async () => {
		const { sut, decrypterSpy } = makeSut();
		jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);

		const promise = sut.authByToken(accessToken);
		await expect(promise).rejects.toThrow();
	});

	test('should call decrypter with right params', async () => {
		const { sut, decrypterSpy } = makeSut();
		const spy = jest.spyOn(decrypterSpy, 'decrypt');

		await sut.authByToken(accessToken);
		expect(spy).toBeCalledWith({ ciphertext: accessToken });
	});

	test('should throw if findOne throws', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockImplementationOnce(
			throwError
		);

		const promise = sut.authByToken(accessToken);
		await expect(promise).rejects.toThrow();
	});

	test('should call findOne with right params', async () => {
		const { sut, findAccountRepositorySpy, decrypterSpy } = makeSut();
		const spy = jest.spyOn(findAccountRepositorySpy, 'findOne');

		await sut.authByToken(accessToken);
		expect(spy).toBeCalledWith(decrypterSpy.result?.payload);
	});

	test('should throw Invalid Token if decrypter return undefined', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValue(
			undefined as any
		);

		const promise = sut.authByToken(accessToken);
		await expect(promise).rejects.toThrowError(AccountError.InvalidToken);
	});

	test('should throw Invalid Token if findOne return null', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValue(null);

		const promise = sut.authByToken(accessToken);
		await expect(promise).rejects.toThrowError(AccountError.InvalidToken);
	});

	test('should return an account', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const result = await sut.authByToken(accessToken);
		expect(result).toEqual(findAccountRepositorySpy.result);
	});
});
