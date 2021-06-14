import { datatype, random } from 'faker';
import { Collection } from 'mongodb';
import {
	MongoAccountRepository,
	MongoHelper,
} from '../../../../src/infra/database';
import { mockAccount } from '../../../domain/mocks/account';

const makeSut = () => new MongoAccountRepository();

describe('MongoAccountRepository', () => {
	let accountCollection: Collection;

	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL as string);
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		accountCollection = await MongoHelper.getCollection('accounts');
		await accountCollection.deleteMany({});
	});

	describe('add()', () => {
		test('should add an account on success', async () => {
			const sut = makeSut();
			await sut.add(mockAccount());
			const count = await accountCollection.countDocuments();
			expect(count).toBe(1);
		});
	});

	describe('findOne()', () => {
		test('should return undefined if not found', async () => {
			const sut = makeSut();
			const account = await sut.findOne('60c594662feb18ddf66c47ab');
			expect(account).toBeNull();
		});

		test('should return an account with success', async () => {
			const { id, ...accountMock } = mockAccount();
			const { insertedId } = await accountCollection.insertOne(
				accountMock
			);
			const sut = makeSut();
			const account = await sut.findOne(insertedId);

			expect(account?.id).toEqual(insertedId);
			expect(account?.access).toEqual(accountMock.access);
			expect(account?.avatarPath).toEqual(accountMock.avatarPath);
			expect(account?.createdAt).toEqual(accountMock.createdAt);
			expect(account?.email).toEqual(accountMock.email);
			expect(account?.name).toEqual(accountMock.name);
			expect(account?.password).toEqual(accountMock.password);
			expect(account?.updatedAt).toEqual(accountMock.updatedAt);
			expect(account?.username).toEqual(accountMock.username);
		});
	});

	describe('findByEmail()', () => {
		test('should return undefined if not found', async () => {
			const sut = makeSut();
			const account = await sut.findByEmail('mail@mail.com');
			expect(account).toBeNull();
		});

		test('should return an account with success', async () => {
			const { id, ...accountMock } = mockAccount();
			const { insertedId } = await accountCollection.insertOne(
				accountMock
			);
			const sut = makeSut();
			const account = await sut.findByEmail(accountMock.email);

			expect(account?.id).toEqual(insertedId);
			expect(account?.access).toEqual(accountMock.access);
			expect(account?.avatarPath).toEqual(accountMock.avatarPath);
			expect(account?.createdAt).toEqual(accountMock.createdAt);
			expect(account?.email).toEqual(accountMock.email);
			expect(account?.name).toEqual(accountMock.name);
			expect(account?.password).toEqual(accountMock.password);
			expect(account?.updatedAt).toEqual(accountMock.updatedAt);
			expect(account?.username).toEqual(accountMock.username);
		});
	});

	describe('findByUsername()', () => {
		test('should return undefined if not found', async () => {
			const sut = makeSut();
			const account = await sut.findByUsername('username');
			expect(account).toBeNull();
		});

		test('should return an account with success', async () => {
			const { id, ...accountMock } = mockAccount();
			const { insertedId } = await accountCollection.insertOne(
				accountMock
			);
			const sut = makeSut();
			const account = await sut.findByUsername(accountMock.username);

			expect(account?.id).toEqual(insertedId);
			expect(account?.access).toEqual(accountMock.access);
			expect(account?.avatarPath).toEqual(accountMock.avatarPath);
			expect(account?.createdAt).toEqual(accountMock.createdAt);
			expect(account?.email).toEqual(accountMock.email);
			expect(account?.name).toEqual(accountMock.name);
			expect(account?.password).toEqual(accountMock.password);
			expect(account?.updatedAt).toEqual(accountMock.updatedAt);
			expect(account?.username).toEqual(accountMock.username);
		});
	});

	describe('update()', () => {
		test('should return an updated account', async () => {
			const { id, ...accountMock } = mockAccount();
			const { insertedId } = await accountCollection.insertOne(
				accountMock
			);
			const sut = makeSut();

			const updatedDate = new Date();

			const updatedAccount = await sut.update({
				id: insertedId,
				updatedAt: updatedDate,
				email: 'new_email',
				name: 'new_name',
				password: 'new_password',
				username: 'new_username',
			});

			expect(updatedAccount.id).toEqual(insertedId);
			expect(updatedAccount.access).toEqual(accountMock.access);
			expect(updatedAccount.avatarPath).toEqual(accountMock.avatarPath);
			expect(updatedAccount.createdAt).toEqual(accountMock.createdAt);
			expect(updatedAccount.email).toEqual('new_email');
			expect(updatedAccount.name).toEqual('new_name');
			expect(updatedAccount.password).toEqual('new_password');
			expect(updatedAccount.updatedAt).toEqual(updatedDate);
			expect(updatedAccount.username).toEqual('new_username');
		});
	});

	describe('fetchIds()', () => {
		test('should return an array of shorts', async () => {
			const sut = makeSut();
			const accountMocks = [
				mockAccount(),
				mockAccount(),
				mockAccount(),
			].map(({ id, ...mock }) => mock);

			const insertResult = await accountCollection.insertMany(
				accountMocks
			);

			const insertedIds = Object.values(insertResult.insertedIds);

			const result = await sut.fetchIds(insertedIds);

			expect(result).toMatchObject(
				accountMocks.map((account, index) => ({
					id: insertedIds[index],
					name: account.name,
					username: account.username,
				}))
			);
		});
	});
});
