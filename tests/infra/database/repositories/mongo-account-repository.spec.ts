import { Collection } from 'mongodb';
import {
	MongoAccountRepository,
	MongoHelper,
} from '../../../../src/infra/database';
import { mockAddAccountParams } from '../../../domain/mocks/account';

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

	test('Should add an account on success', async () => {
		const sut = makeSut();
		await sut.add(mockAddAccountParams());
		const count = await accountCollection.countDocuments();
		expect(count).toBe(1);
	});
});
