import { DatabaseError } from '../../../src/data/errors';
import { DbFindGroupAccounts } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FetchAccountsRepositorySpy } from '../mocks/account-mocks';
import {
	FindGroupByIdRepositorySpy,
	FindGroupBindingRepositorySpy,
} from '../mocks/group-mocks';

const makeSut = () => {
	const findGroupByIdRepositorySpy = new FindGroupByIdRepositorySpy();
	const findGroupBindingRepositorySpy = new FindGroupBindingRepositorySpy();
	const fetchAccountsRepositorySpy = new FetchAccountsRepositorySpy();
	const sut = new DbFindGroupAccounts(
		findGroupByIdRepositorySpy,
		findGroupBindingRepositorySpy,
		fetchAccountsRepositorySpy
	);

	return {
		sut,
		findGroupByIdRepositorySpy,
		findGroupBindingRepositorySpy,
		fetchAccountsRepositorySpy,
	};
};

describe('DbFindGroupAccounts', () => {
	const groupId = 'group_id';

	test('should call findById with the right params', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();

		const spy = jest.spyOn(findGroupByIdRepositorySpy, 'findById');

		await sut.findAccounts(groupId);
		expect(spy).toBeCalledWith(groupId);
	});

	test('should throw if FindGroupByIdRepository throws', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupByIdRepositorySpy,
			'findById'
		).mockImplementationOnce(throwError);

		const promise = sut.findAccounts(groupId);
		await expect(promise).rejects.toThrow();
	});

	test('should call findBinding with the right params', async () => {
		const {
			sut,
			findGroupBindingRepositorySpy,
			findGroupByIdRepositorySpy,
		} = makeSut();

		const spy = jest.spyOn(findGroupBindingRepositorySpy, 'findBinding');

		await sut.findAccounts(groupId);
		expect(spy).toBeCalledWith(
			findGroupByIdRepositorySpy.result?.bindingId
		);
	});

	test('should throw if FindGroupBindingRepository throws', async () => {
		const { sut, findGroupBindingRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupBindingRepositorySpy,
			'findBinding'
		).mockImplementationOnce(throwError);

		const promise = sut.findAccounts(groupId);
		await expect(promise).rejects.toThrow();
	});

	test('should return a short account array', async () => {
		const { sut, fetchAccountsRepositorySpy } = makeSut();

		const result = await sut.findAccounts(groupId);

		expect(result).toEqual(fetchAccountsRepositorySpy.result);
	});
});
