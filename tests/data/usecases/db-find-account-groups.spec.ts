import { DatabaseError } from '../../../src/data/errors';
import { DbFindAccountGroups, DbFindGroups } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';
import { FindGroupsByAccountRepositorySpy } from '../mocks/group-mocks';

const makeSut = () => {
	const findGroupsByAccountRepositorySpy =
		new FindGroupsByAccountRepositorySpy();
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const sut = new DbFindAccountGroups(
		findGroupsByAccountRepositorySpy,
		findAccountRepositorySpy
	);

	return {
		sut,
		findGroupsByAccountRepositorySpy,
		findAccountRepositorySpy,
	};
};

describe('DbFindAccountGroups', () => {
	const accountId = 'account_id';

	test('should throw if account not found', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValueOnce(
			null
		);

		const promise = sut.findAccountGroups(accountId);

		await expect(promise).rejects.toThrow(DatabaseError.NotFound);
	});

	test('should return an group array', async () => {
		const { sut, findGroupsByAccountRepositorySpy } = makeSut();

		const result = await sut.findAccountGroups(accountId);

		expect(result).toEqual(findGroupsByAccountRepositorySpy.result);
	});
});
