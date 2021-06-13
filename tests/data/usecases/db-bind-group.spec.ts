import { DatabaseError } from '../../../src/data/errors';
import { DbBindGroupAccount } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';
import {
	BinderGroupRepositorySpy,
	FindGroupByIdRepositorySpy,
} from '../mocks/group-mocks';

const makeSut = () => {
	const binderGroupRepositorySpy = new BinderGroupRepositorySpy();
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const findGroupByIdRepositorySpy = new FindGroupByIdRepositorySpy();
	const sut = new DbBindGroupAccount(
		binderGroupRepositorySpy,
		findAccountRepositorySpy,
		findGroupByIdRepositorySpy
	);

	return {
		sut,
		binderGroupRepositorySpy,
		findAccountRepositorySpy,
		findGroupByIdRepositorySpy,
	};
};

describe('DbBindGroup', () => {
	const bindParams = {
		accountId: 'account_id',
		groupId: 'group_id',
		bind: true,
	};

	test('should call find with the right params', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const spy = jest.spyOn(findAccountRepositorySpy, 'findOne');

		await sut.bindAccountId(bindParams);
		expect(spy).toBeCalledWith(bindParams.accountId);
	});

	test('should throw if FindAccountRepository throws', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockImplementationOnce(
			throwError
		);

		const promise = sut.bindAccountId(bindParams);
		await expect(promise).rejects.toThrow();
	});

	test('should throw if admin account not found', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValueOnce(
			null
		);

		const promise = sut.bindAccountId(bindParams);
		await expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});

	test('should call find with the right params', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();

		const spy = jest.spyOn(findGroupByIdRepositorySpy, 'findById');

		await sut.bindAccountId(bindParams);
		expect(spy).toBeCalledWith(bindParams.groupId);
	});

	test('should throw if FindAccountRepository throws', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupByIdRepositorySpy,
			'findById'
		).mockImplementationOnce(throwError);

		const promise = sut.bindAccountId(bindParams);
		await expect(promise).rejects.toThrow();
	});

	test('should throw if admin account not found', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupByIdRepositorySpy,
			'findById'
		).mockResolvedValueOnce(null);

		const promise = sut.bindAccountId(bindParams);
		await expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});

	test('should call find with the right params', async () => {
		const { sut, binderGroupRepositorySpy } = makeSut();

		const spy = jest.spyOn(binderGroupRepositorySpy, 'bind');

		await sut.bindAccountId(bindParams);
		expect(spy).toBeCalledWith(bindParams);
	});

	test('should throw if FindAccountRepository throws', async () => {
		const { sut, binderGroupRepositorySpy } = makeSut();
		jest.spyOn(binderGroupRepositorySpy, 'bind').mockImplementationOnce(
			throwError
		);

		const promise = sut.bindAccountId(bindParams);
		await expect(promise).rejects.toThrow();
	});
});
