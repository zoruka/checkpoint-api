import { AccountError } from '../../../src/data/errors';
import { DbAuthAccount } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindAccountByUsernameRepositorySpy } from '../mocks/account-mocks';
import { EncrypterSpy, HashComparerSpy } from '../mocks/crypto-mocks';

const makeSut = () => {
	const findAccountByUsernameRepositorySpy =
		new FindAccountByUsernameRepositorySpy();
	const hashComparerSpy = new HashComparerSpy();
	const encrypterSpy = new EncrypterSpy();
	const sut = new DbAuthAccount(
		findAccountByUsernameRepositorySpy,
		hashComparerSpy,
		encrypterSpy
	);

	return {
		sut,
		findAccountByUsernameRepositorySpy,
		hashComparerSpy,
		encrypterSpy,
	};
};

describe('DbAuthAccount', () => {
	const authParams = {
		username: 'username',
		password: 'password',
	};

	test('should call findByUsername with the right params', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();

		const spy = jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		);

		await sut.auth(authParams);
		expect(spy).toBeCalledWith(authParams.username);
	});

	test('should call compare with the right params', async () => {
		const { sut, hashComparerSpy, findAccountByUsernameRepositorySpy } =
			makeSut();

		const spy = jest.spyOn(hashComparerSpy, 'compare');

		await sut.auth(authParams);
		expect(spy).toBeCalledWith({
			plaintext: authParams.password,
			digest: findAccountByUsernameRepositorySpy.result?.password,
		});
	});

	test('should call encrypt with the right params', async () => {
		const { sut, encrypterSpy, findAccountByUsernameRepositorySpy } =
			makeSut();

		const spy = jest.spyOn(encrypterSpy, 'encrypt');

		await sut.auth(authParams);
		expect(spy).toBeCalledWith({
			plaintext: findAccountByUsernameRepositorySpy.result?.id,
		});
	});

	test('should throw if FindAccountByUsernameRepository throws', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		).mockImplementationOnce(throwError);

		const promise = sut.auth(authParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if HashComparer throws', async () => {
		const { sut, hashComparerSpy } = makeSut();
		jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(
			throwError
		);

		const promise = sut.auth(authParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if Encrypter throws', async () => {
		const { sut, encrypterSpy } = makeSut();
		jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);

		const promise = sut.auth(authParams);

		await expect(promise).rejects.toThrow();
	});

	test('should return auth response', async () => {
		const { sut, encrypterSpy, findAccountByUsernameRepositorySpy } =
			makeSut();

		const result = await sut.auth(authParams);

		expect(result).toMatchObject({
			accessToken: encrypterSpy.result,
			userId: findAccountByUsernameRepositorySpy.result?.id,
			name: findAccountByUsernameRepositorySpy.result?.name,
		});
	});

	test('should throw if user could not be found', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		).mockResolvedValueOnce(undefined);

		const promise = sut.auth(authParams);

		await expect(promise).rejects.toThrowError(
			AccountError.InvalidCredentials
		);
	});

	test('should throw if password is invalid', async () => {
		const { sut, hashComparerSpy } = makeSut();
		jest.spyOn(hashComparerSpy, 'compare').mockResolvedValueOnce(false);

		const promise = sut.auth(authParams);

		await expect(promise).rejects.toThrowError(
			AccountError.InvalidCredentials
		);
	});
});
