import { internet, name, system } from 'faker';
import { AccountError } from '../../../src/data/errors';
import { DbAddAccount } from '../../../src/data/usecases';
import { Account } from '../../../src/domain/models';
import { throwError } from '../../utils';
import {
	AddAccountRepositorySpy,
	FindAccountByEmailRepositorySpy,
	FindAccountByUsernameRepositorySpy,
} from '../mocks/account-mocks';
import { HasherSpy } from '../mocks/crypto-mocks';

const makeSut = () => {
	const addAccountRepositorySpy = new AddAccountRepositorySpy();
	const findAccountByEmailRepositorySpy =
		new FindAccountByEmailRepositorySpy();
	const findAccountByUsernameRepositorySpy =
		new FindAccountByUsernameRepositorySpy();
	const hasherSpy = new HasherSpy();
	const sut = new DbAddAccount(
		addAccountRepositorySpy,
		findAccountByEmailRepositorySpy,
		findAccountByUsernameRepositorySpy,
		hasherSpy
	);

	jest.spyOn(
		findAccountByEmailRepositorySpy,
		'findByEmail'
	).mockResolvedValue(null);
	jest.spyOn(
		findAccountByUsernameRepositorySpy,
		'findByUsername'
	).mockResolvedValue(null);

	return {
		sut,
		addAccountRepositorySpy,
		findAccountByEmailRepositorySpy,
		findAccountByUsernameRepositorySpy,
		hasherSpy,
	};
};

const addParams = {
	access: Account.Access.Profile,
	avatarPath: system.filePath(),
	email: internet.email(),
	name: name.findName(),
	username: internet.userName(),
	password: internet.password(),
	twitch: 'twitch',
	steam: 'steam',
	level: 0,
};

describe('DbAddAccount', () => {
	test('should throw if FindAccountByEmailRepository throws', async () => {
		const { sut, findAccountByEmailRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByEmailRepositorySpy,
			'findByEmail'
		).mockImplementationOnce(throwError);

		const promise = sut.add(addParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if FindAccountByUsernameRepository throws', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		).mockImplementationOnce(throwError);

		const promise = sut.add(addParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if Hasher throws', async () => {
		const { sut, hasherSpy } = makeSut();
		jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);

		const promise = sut.add(addParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if AddAccountRepository throws', async () => {
		const { sut, addAccountRepositorySpy } = makeSut();
		jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(
			throwError
		);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrow();
	});

	test('should call findByEmail with the right params', async () => {
		const { sut, findAccountByEmailRepositorySpy } = makeSut();

		const spy = jest.spyOn(findAccountByEmailRepositorySpy, 'findByEmail');

		await sut.add(addParams);
		expect(spy).toBeCalledWith(addParams.email);
	});

	test('should call findByUsername with the right params', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();

		const spy = jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		);

		await sut.add(addParams);
		expect(spy).toBeCalledWith(addParams.username);
	});

	test('should call hash with the right params', async () => {
		const { sut, hasherSpy } = makeSut();

		const spy = jest.spyOn(hasherSpy, 'hash');

		await sut.add(addParams);
		expect(spy).toBeCalledWith({ plaintext: addParams.password });
	});

	test('should call add with the right params', async () => {
		const { sut, addAccountRepositorySpy, hasherSpy } = makeSut();

		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date());

		const spy = jest.spyOn(addAccountRepositorySpy, 'add');

		await sut.add(addParams);
		expect(spy).toBeCalledWith({
			access: addParams.access,
			email: addParams.email,
			name: addParams.name,
			password: hasherSpy.result,
			username: addParams.username,
			avatarPath: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			twitch: addParams.twitch,
			steam: addParams.steam,
			level: addParams.level,
		});

		jest.useRealTimers();
	});

	test('should return a database document', async () => {
		const { sut, addAccountRepositorySpy } = makeSut();

		const result = await sut.add(addParams);

		expect(result).toEqual(addAccountRepositorySpy.result);
	});

	test('should throw if email already in use', async () => {
		const { sut, findAccountByEmailRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByEmailRepositorySpy,
			'findByEmail'
		).mockRestore();

		const promise = sut.add(addParams);

		await expect(promise).rejects.toThrowError(AccountError.EmailConflict);
	});

	test('should throw if username already in use', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		).mockRestore();

		const promise = sut.add(addParams);

		await expect(promise).rejects.toThrowError(
			AccountError.UsernameConflict
		);
	});
});
