import { internet, name, system } from 'faker';
import { DbUpdateAccount } from '../../../src/data/usecases';
import { Account } from '../../../src/domain/models';
import { throwError } from '../../utils';
import { UpdateAccountRepositorySpy } from '../mocks/account-mocks';

type SutObject = {
	sut: DbUpdateAccount;
	updateAccountRepositorySpy: UpdateAccountRepositorySpy;
};

const makeSut = (): SutObject => {
	const updateAccountRepositorySpy = new UpdateAccountRepositorySpy();
	const sut = new DbUpdateAccount(updateAccountRepositorySpy);
	return {
		sut,
		updateAccountRepositorySpy,
	};
};

const toUpdateAccount = {
	access: Account.Access.Profile,
	avatarPath: system.filePath(),
	email: internet.email(),
	name: name.findName(),
	username: internet.userName(),
	password: internet.password(),
};

describe('DbUpdateAccount', () => {
	test('should call update with the name param', async () => {
		const { sut, updateAccountRepositorySpy } = makeSut();

		const spy = spyOn(updateAccountRepositorySpy, 'update');

		await sut.update(toUpdateAccount);
		expect(spy).toBeCalledWith(toUpdateAccount);
	});

	test('should return object with updated values', async () => {
		const { sut } = makeSut();

		const result = await sut.update(toUpdateAccount);

		expect(result.name).toEqual(toUpdateAccount.name);
		expect(result.avatarPath).toEqual(toUpdateAccount.avatarPath);
		expect(result.email).toEqual(toUpdateAccount.email);
		expect(result.name).toEqual(toUpdateAccount.name);
		expect(result.username).toEqual(toUpdateAccount.username);
		expect(result.password).toEqual(toUpdateAccount.password);
	});

	test('should throw if spy throws', async () => {
		const { sut, updateAccountRepositorySpy } = makeSut();
		jest.spyOn(updateAccountRepositorySpy, 'update').mockImplementationOnce(
			throwError
		);

		const promise = sut.update(toUpdateAccount);

		await expect(promise).rejects.toThrow();
	});
});
