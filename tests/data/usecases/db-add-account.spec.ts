import { internet, name, system } from 'faker';
import { DbAddAccount } from '../../../src/data/usecases';
import { Account } from '../../../src/domain/models';
import { throwError } from '../../utils';
import { AddAccountRepositorySpy } from '../mocks/account-mocks';

type SutObject = {
	sut: DbAddAccount;
	addAccountRepositorySpy: AddAccountRepositorySpy;
};

const makeSut = (): SutObject => {
	const addAccountRepositorySpy = new AddAccountRepositorySpy();
	const sut = new DbAddAccount(addAccountRepositorySpy);
	return {
		sut,
		addAccountRepositorySpy,
	};
};

const toAddAccount = {
	access: Account.Access.Profile,
	avatarPath: system.filePath(),
	email: internet.email(),
	name: name.findName(),
	username: internet.userName(),
	password: internet.password(),
};

describe('DbAddAccount', () => {
	test('should call add with the right params', async () => {
		const { sut, addAccountRepositorySpy } = makeSut();

		const spy = spyOn(addAccountRepositorySpy, 'add');

		await sut.add(toAddAccount);
		expect(spy).toBeCalledWith(toAddAccount);
	});

	test('should return a database document', async () => {
		const { sut, addAccountRepositorySpy } = makeSut();

		const result = await sut.add(toAddAccount);

		expect(result).toEqual(addAccountRepositorySpy.result);
	});

	test('should throw if AddAccountRepository throws', async () => {
		const { sut, addAccountRepositorySpy } = makeSut();
		jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(
			throwError
		);

		const promise = sut.add(toAddAccount);
		await expect(promise).rejects.toThrow();
	});

	test('should return a database document with same data', async () => {
		const { sut } = makeSut();

		const result = await sut.add(toAddAccount);
		expect(result.access).toEqual(toAddAccount.access);
		expect(result.avatarPath).toEqual(toAddAccount.avatarPath);
		expect(result.email).toEqual(toAddAccount.email);
		expect(result.name).toEqual(toAddAccount.name);
		expect(result.username).toEqual(toAddAccount.username);
	});
});
