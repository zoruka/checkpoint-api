import { DatabaseError } from '../../../src/data/errors';
import {
	DbFindGroupAccounts,
	DbFindGroupById,
} from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FetchAccountsRepositorySpy } from '../mocks/account-mocks';
import {
	FindGroupByIdRepositorySpy,
	FindGroupBindingRepositorySpy,
} from '../mocks/group-mocks';

const makeSut = () => {
	const findGroupByIdRepositorySpy = new FindGroupByIdRepositorySpy();
	const sut = new DbFindGroupById(findGroupByIdRepositorySpy);

	return {
		sut,
		findGroupByIdRepositorySpy,
	};
};

describe('DbFindGroupById', () => {
	const groupId = 'group_id';

	test('should call findById with the right params', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();

		const spy = jest.spyOn(findGroupByIdRepositorySpy, 'findById');

		await sut.findById(groupId);
		expect(spy).toBeCalledWith(groupId);
	});

	test('should throw if FindGroupByIdRepository throws', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupByIdRepositorySpy,
			'findById'
		).mockImplementationOnce(throwError);

		const promise = sut.findById(groupId);
		await expect(promise).rejects.toThrow();
	});

	test('should return a group document', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();

		const result = await sut.findById(groupId);

		expect(result).toEqual(findGroupByIdRepositorySpy.result);
	});
});
