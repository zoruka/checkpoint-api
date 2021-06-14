import { datatype, random } from 'faker';
import { Collection } from 'mongodb';
import {
	MongoGroupRepository,
	MongoHelper,
} from '../../../../src/infra/database';
import { mockGroup, mockGroupBinding } from '../../../domain/mocks';

const makeSut = () => new MongoGroupRepository();

describe('MongoGroupRepository', () => {
	let groupsCollection: Collection;
	let bindingsCollection: Collection;

	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL as string);
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		groupsCollection = await MongoHelper.getCollection('groups');
		bindingsCollection = await MongoHelper.getCollection('group-bindings');
	});

	describe('add()', () => {
		test('should add a group on success', async () => {
			const sut = makeSut();
			await sut.add(mockGroup());
			const count = await groupsCollection.countDocuments();
			expect(count).toBe(1);
		});
	});

	describe('addBinding()', () => {
		test('should add a group binding on success', async () => {
			const sut = makeSut();
			await sut.addBinding(mockGroupBinding());
			const count = await bindingsCollection.countDocuments();
			expect(count).toBe(1);
		});
	});

	describe('findById()', () => {
		test('should return undefined if not found', async () => {
			const sut = makeSut();
			const group = await sut.findById('60c594662feb18ddf66c47ab');
			expect(group).toBeNull();
		});

		test('should return a group with success', async () => {
			const { id, ...groupMocks } = mockGroup();
			const { insertedId } = await groupsCollection.insertOne(groupMocks);
			const sut = makeSut();
			const group = await sut.findById(insertedId);

			expect(group?.id).toEqual(insertedId);
			expect(group?.createdAt).toEqual(groupMocks.createdAt);
			expect(group?.updatedAt).toEqual(groupMocks.updatedAt);
			expect(group?.name).toEqual(groupMocks.name);
			expect(group?.adminId).toEqual(groupMocks.adminId);
			expect(group?.bindingId).toEqual(groupMocks.bindingId);
			expect(group?.tag).toEqual(groupMocks.tag);
			expect(group?.adminId).toEqual(groupMocks.adminId);
		});
	});

	describe('findBinding()', () => {
		test('should return undefined if not found', async () => {
			const sut = makeSut();
			const binding = await sut.findBinding('60c594662feb18ddf66c47ab');
			expect(binding).toBeNull();
		});

		test('should return a group  with success', async () => {
			const { id, ...bindingMock } = mockGroupBinding();
			const { insertedId } = await bindingsCollection.insertOne(
				bindingMock
			);
			const sut = makeSut();
			const binding = await sut.findBinding(insertedId);

			expect(binding?.id).toEqual(insertedId);
			expect(binding?.createdAt).toEqual(bindingMock.createdAt);
			expect(binding?.updatedAt).toEqual(bindingMock.updatedAt);
			expect(binding?.accounts).toEqual(bindingMock.accounts);
		});
	});

	describe('find()', () => {
		test('should return a empty array', async () => {
			const sut = makeSut();
			const findResult = await sut.find('search');
			expect(findResult).toEqual([]);
		});

		test('should return a group by tag', async () => {
			const groupMocks = [
				mockGroup({ name: 'group_abc' }),
				mockGroup({ name: 'group_ABC' }),
				mockGroup({ name: 'big_strong_group' }),
			].map(({ id, ...mock }) => mock);

			await groupsCollection.insertMany(groupMocks);
			const sut = makeSut();
			const groups = await sut.find('abc');

			expect(groups.length).toEqual(2);
		});

		test('should return no group', async () => {
			const groupMocks = [
				mockGroup({ name: 'group_abc' }),
				mockGroup({ name: 'group_ABC' }),
				mockGroup({ name: 'big_strong_group' }),
			].map(({ id, ...mock }) => mock);

			await groupsCollection.insertMany(groupMocks);
			const sut = makeSut();
			const groups = await sut.find('xxx');

			expect(groups.length).toEqual(0);
		});
	});

	describe('update()', () => {
		test('should return an updated account', async () => {
			const { id, ...groupMock } = mockGroup();
			const { insertedId } = await groupsCollection.insertOne(groupMock);
			const sut = makeSut();

			const updatedDate = new Date();

			const updatedAccount = await sut.update({
				id: insertedId,
				updatedAt: updatedDate,
				adminId: 'new_admin_id',
				name: 'new_name',
			});

			expect(updatedAccount.name).toEqual('new_name');
			expect(updatedAccount.adminId).toEqual('new_admin_id');
		});
	});

	describe('generateTag()', () => {
		test('should return a sequenced tag', async () => {
			const sut = makeSut();

			const generatedTag = await sut.generateTag();

			expect(typeof generatedTag).toEqual('string');
		});
	});
});
