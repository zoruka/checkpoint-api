import { datatype, internet, name, system } from 'faker';
import { DbUpdateAccount } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import {
	FindAccountByEmailRepositorySpy,
	FindAccountByUsernameRepositorySpy,
	FindAccountRepositorySpy,
	UpdateAccountRepositorySpy,
} from '../mocks/account-mocks';
import { HasherSpy } from '../mocks/crypto-mocks';

const makeSut = () => {
	const updateAccountRepositorySpy = new UpdateAccountRepositorySpy();
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const findAccountByEmailRepositorySpy =
		new FindAccountByEmailRepositorySpy();
	const findAccountByUsernameRepositorySpy =
		new FindAccountByUsernameRepositorySpy();
	const hasherSpy = new HasherSpy();
	const sut = new DbUpdateAccount(
		updateAccountRepositorySpy,
		findAccountRepositorySpy,
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
		updateAccountRepositorySpy,
		findAccountRepositorySpy,
		findAccountByEmailRepositorySpy,
		findAccountByUsernameRepositorySpy,
		hasherSpy,
	};
};

describe('DbUpdateAccount', () => {
	const updateParams = {
		id: datatype.uuid(),
		email: internet.email(),
		name: name.findName(),
		username: internet.userName(),
		password: internet.password(),
	};

	test('should call findByEmail with the right params', async () => {
		const { sut, findAccountByEmailRepositorySpy } = makeSut();

		const spy = jest.spyOn(findAccountByEmailRepositorySpy, 'findByEmail');

		await sut.update(updateParams);
		expect(spy).toBeCalledWith(updateParams.email);
	});

	test('should call findByUsername with the right params', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();

		const spy = jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		);

		await sut.update(updateParams);
		expect(spy).toBeCalledWith(updateParams.username);
	});

	test('should call hash with the right params', async () => {
		const { sut, hasherSpy } = makeSut();

		const spy = jest.spyOn(hasherSpy, 'hash');

		await sut.update(updateParams);
		expect(spy).toBeCalledWith({ plaintext: updateParams.password });
	});

	test('should call update with new values', async () => {
		const { sut, updateAccountRepositorySpy, hasherSpy } = makeSut();

		const spy = jest.spyOn(updateAccountRepositorySpy, 'update');

		await sut.update(updateParams);
		expect(spy).toBeCalledWith({
			...updateParams,
			password: hasherSpy.result,
		});
	});

	test('should throw if FindAccountByEmailRepository throws', async () => {
		const { sut, findAccountByEmailRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByEmailRepositorySpy,
			'findByEmail'
		).mockImplementationOnce(throwError);

		const promise = sut.update(updateParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if FindAccountByUsernameRepository throws', async () => {
		const { sut, findAccountByUsernameRepositorySpy } = makeSut();
		jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		).mockImplementationOnce(throwError);

		const promise = sut.update(updateParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if Hasher throws', async () => {
		const { sut, hasherSpy } = makeSut();
		jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);

		const promise = sut.update(updateParams);

		await expect(promise).rejects.toThrow();
	});

	test('should throw if UpdateAccountRepository throws', async () => {
		const { sut, updateAccountRepositorySpy } = makeSut();
		jest.spyOn(updateAccountRepositorySpy, 'update').mockImplementationOnce(
			throwError
		);

		const promise = sut.update(updateParams);

		await expect(promise).rejects.toThrow();
	});

	test('should continue with same values', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const result = await sut.update({ id: 'account_id' });

		expect(result).toMatchObject({
			id: 'account_id',
			email: findAccountRepositorySpy.result?.email,
			username: findAccountRepositorySpy.result?.username,
			password: findAccountRepositorySpy.result?.password,
			name: findAccountRepositorySpy.result?.name,
		});
	});

	test('should not call repositories when no data is provided', async () => {
		const {
			sut,
			findAccountByUsernameRepositorySpy,
			findAccountByEmailRepositorySpy,
			hasherSpy,
		} = makeSut();

		await sut.update({ id: 'account_id' });

		const findByUsernameSpy = jest.spyOn(
			findAccountByUsernameRepositorySpy,
			'findByUsername'
		);
		const findByEmailSpy = jest.spyOn(
			findAccountByEmailRepositorySpy,
			'findByEmail'
		);
		const hashSpy = jest.spyOn(hasherSpy, 'hash');

		expect(findByUsernameSpy).not.toHaveBeenCalled();
		expect(findByEmailSpy).not.toHaveBeenCalled();
		expect(hashSpy).not.toHaveBeenCalled();
	});
});
