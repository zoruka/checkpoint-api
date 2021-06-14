import { DatabaseError } from '../../../src/data/errors';
import { DbAddPost } from '../../../src/data/usecases';
import { mockPost } from '../../domain/mocks';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';
import { FindGroupByIdRepositorySpy } from '../mocks/group-mocks';
import { AddPostRepositorySpy } from '../mocks/post-mocks';

const makeSut = () => {
	const addPostRepositorySpy = new AddPostRepositorySpy();
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const findGroupByIdRepositorySpy = new FindGroupByIdRepositorySpy();

	const sut = new DbAddPost(
		addPostRepositorySpy,
		findAccountRepositorySpy,
		findGroupByIdRepositorySpy
	);

	return {
		sut,
		addPostRepositorySpy,
		findAccountRepositorySpy,
		findGroupByIdRepositorySpy,
	};
};

describe('DbAddPost', () => {
	const { id, ...addParams } = mockPost();

	test('should throw if account not found', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValueOnce(
			null
		);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});

	test('should throw if group not found', async () => {
		const { sut, findGroupByIdRepositorySpy } = makeSut();
		jest.spyOn(
			findGroupByIdRepositorySpy,
			'findById'
		).mockResolvedValueOnce(null);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});

	test('should return a post', async () => {
		const { sut, addPostRepositorySpy } = makeSut();

		const result = await sut.add(addParams);
		expect(result).toEqual(addPostRepositorySpy.result);
	});
});
