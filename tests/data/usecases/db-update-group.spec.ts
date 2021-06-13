import { DatabaseError } from '../../../src/data/errors';
import { DbUpdateGroup } from '../../../src/data/usecases';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';
import {
	FindGroupByIdRepositorySpy,
	UpdateGroupRepositorySpy,
} from '../mocks/group-mocks';

const makeSut = () => {
	const findGroupByIdRepositorySpy = new FindGroupByIdRepositorySpy();
	const updateGroupRepositorySpy = new UpdateGroupRepositorySpy();

	const findAccountRepositorySpy = new FindAccountRepositorySpy();

	const sut = new DbUpdateGroup(
		findGroupByIdRepositorySpy,
		updateGroupRepositorySpy,
		findAccountRepositorySpy
	);

	return {
		sut,
		findGroupByIdRepositorySpy,
		updateGroupRepositorySpy,
		findAccountRepositorySpy,
	};
};

describe('DbUpdateGroup', () => {
	const updateParams = {
		id: 'group_id',
		adminId: 'admin_id',
		name: 'name',
		updatedAt: new Date(),
	};

	test('should return an updated group', async () => {
		const { sut, updateGroupRepositorySpy } = makeSut();

		const result = await sut.update(updateParams);

		expect(result).toEqual(updateGroupRepositorySpy.result);
	});

	test('should throw if group not found', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupByIdRepositorySpy,
			'findById'
		).mockResolvedValueOnce(null);

		const promise = sut.update(updateParams);

		expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});

	test('should throw if account not found', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValueOnce(
			null
		);

		const promise = sut.update(updateParams);

		expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});
});
