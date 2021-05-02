import { datatype, random } from 'faker';
import { DbFindAccount } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';

type SutObject = {
	sut: DbFindAccount;
	findAccountRepositorySpy: FindAccountRepositorySpy;
};

const makeSut = (): SutObject => {
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const sut = new DbFindAccount(findAccountRepositorySpy);
	return {
		sut,
		findAccountRepositorySpy,
	};
};

describe('DbFindAccount', () => {
	test('should call find with the right params', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const spy = spyOn(findAccountRepositorySpy, 'findOne');

		const id = datatype.uuid();

		await sut.findOne({ id });
		expect(spy).toBeCalledWith({ id });
	});

	test('should return a database document', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const id = datatype.uuid();

		const result = await sut.findOne({ id });
		expect(result).toEqual(findAccountRepositorySpy.result);
	});

	test('should throw if FindAccountRepository throws', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockImplementationOnce(
			throwError
		);

		const id = datatype.uuid();

		const promise = sut.findOne({ id });
		await expect(promise).rejects.toThrow();
	});

	test('should return a database document with same id', async () => {
		const { sut } = makeSut();

		const id = datatype.uuid();

		const result = await sut.findOne({ id });
		expect(result.id).toEqual(id);
	});
});
