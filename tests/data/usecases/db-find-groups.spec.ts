import { DatabaseError } from '../../../src/data/errors';
import { DbFindGroups } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindGroupsRepositorySpy } from '../mocks/group-mocks';

const makeSut = () => {
	const findGroupsRepositorySpy = new FindGroupsRepositorySpy();
	const sut = new DbFindGroups(findGroupsRepositorySpy);

	return {
		sut,
		findGroupsRepositorySpy,
	};
};

describe('DbFindGroups', () => {
	const searchValue = 'value';

	test('should call find with the right params', async () => {
		const { sut, findGroupsRepositorySpy } = makeSut();

		const spy = jest.spyOn(findGroupsRepositorySpy, 'find');

		await sut.find(searchValue);
		expect(spy).toBeCalledWith(searchValue);
	});

	test('should throw if FindGroupsRepository throws', async () => {
		const { sut, findGroupsRepositorySpy } = makeSut();
		jest.spyOn(findGroupsRepositorySpy, 'find').mockImplementationOnce(
			throwError
		);

		const promise = sut.find(searchValue);
		await expect(promise).rejects.toThrow();
	});

	test('should return a group document array', async () => {
		const { sut, findGroupsRepositorySpy } = makeSut();

		const result = await sut.find(searchValue);

		expect(result).toEqual(findGroupsRepositorySpy.result);
	});
});
