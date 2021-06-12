import { datatype, random } from 'faker';
import { DatabaseError } from '../../../src/data/errors';
import { DbFindAccount } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';

const makeSut = () => {
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const sut = new DbFindAccount(findAccountRepositorySpy);
	return {
		sut,
		findAccountRepositorySpy,
	};
};

describe('DbFindAccount', () => {
	const updateParams = { id: datatype.uuid() };

	test('should call find with the right params', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const spy = jest.spyOn(findAccountRepositorySpy, 'findOne');

		await sut.findOne(updateParams);
		expect(spy).toBeCalledWith(updateParams.id);
	});

	test('should return a database document', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const result = await sut.findOne(updateParams);
		expect(result).toEqual(findAccountRepositorySpy.result);
	});

	test('should throw if FindAccountRepository throws', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockImplementationOnce(
			throwError
		);

		const promise = sut.findOne(updateParams);
		await expect(promise).rejects.toThrow();
	});

	test('should throw if account could not be found', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValueOnce(
			null
		);

		const promise = sut.findOne(updateParams);
		await expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});
});
