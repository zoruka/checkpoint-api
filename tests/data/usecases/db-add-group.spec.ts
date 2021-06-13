import { DatabaseError } from '../../../src/data/errors';
import { DbAddGroup } from '../../../src/data/usecases';
import { throwError } from '../../utils';
import { FindAccountRepositorySpy } from '../mocks/account-mocks';
import {
	GenerateGroupTagRepositorySpy,
	AddGroupRepositorySpy,
	AddGroupBindingRepositorySpy,
} from '../mocks/group-mocks';

const makeSut = () => {
	const generateGroupTagRepositorySpy = new GenerateGroupTagRepositorySpy();
	const addGroupRepositorySpy = new AddGroupRepositorySpy();
	const addGroupBindingRepositorySpy = new AddGroupBindingRepositorySpy();
	const findAccountRepositorySpy = new FindAccountRepositorySpy();
	const sut = new DbAddGroup(
		generateGroupTagRepositorySpy,
		addGroupRepositorySpy,
		addGroupBindingRepositorySpy,
		findAccountRepositorySpy
	);

	return {
		sut,
		generateGroupTagRepositorySpy,
		addGroupRepositorySpy,
		addGroupBindingRepositorySpy,
		findAccountRepositorySpy,
	};
};

describe('DbAddGroup', () => {
	const addParams = {
		adminId: 'admin_id',
		name: 'group_name',
	};

	test('should call find with the right params', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();

		const spy = jest.spyOn(findAccountRepositorySpy, 'findOne');

		await sut.add(addParams);
		expect(spy).toBeCalledWith(addParams.adminId);
	});

	test('should throw if FindAccountRepository throws', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockImplementationOnce(
			throwError
		);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrow();
	});

	test('should throw if admin account not found', async () => {
		const { sut, findAccountRepositorySpy } = makeSut();
		jest.spyOn(findAccountRepositorySpy, 'findOne').mockResolvedValueOnce(
			null
		);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrowError(DatabaseError.NotFound);
	});

	test('should throw if GenerateGroupTagRepository throws', async () => {
		const { sut, generateGroupTagRepositorySpy } = makeSut();
		jest.spyOn(
			generateGroupTagRepositorySpy,
			'generateTag'
		).mockImplementationOnce(throwError);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrow();
	});

	test('should call group binding add with the right params', async () => {
		const { sut, addGroupBindingRepositorySpy } = makeSut();

		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date());

		const spy = jest.spyOn(addGroupBindingRepositorySpy, 'addBinding');

		await sut.add(addParams);
		expect(spy).toBeCalledWith({
			createdAt: new Date(),
			updatedAt: new Date(),
			accounts: {},
		});

		jest.useRealTimers();
	});

	test('should throw if AddGroupRepository throws', async () => {
		const { sut, addGroupRepositorySpy } = makeSut();
		jest.spyOn(addGroupRepositorySpy, 'add').mockImplementationOnce(
			throwError
		);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrow();
	});

	test('should call group binding add with the right params', async () => {
		const {
			sut,
			addGroupRepositorySpy,
			addGroupBindingRepositorySpy,
			generateGroupTagRepositorySpy,
		} = makeSut();

		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date());

		const spy = jest.spyOn(addGroupRepositorySpy, 'add');

		await sut.add(addParams);
		expect(spy).toBeCalledWith({
			createdAt: new Date(),
			updatedAt: new Date(),
			bindingId: addGroupBindingRepositorySpy.result?.id,
			name: addParams.name,
			adminId: addParams.adminId,
			tag: generateGroupTagRepositorySpy.result,
		});

		jest.useRealTimers();
	});

	test('should throw if AddGroupBindingRepository throws', async () => {
		const { sut, addGroupRepositorySpy } = makeSut();
		jest.spyOn(addGroupRepositorySpy, 'add').mockImplementationOnce(
			throwError
		);

		const promise = sut.add(addParams);
		await expect(promise).rejects.toThrow();
	});
});
