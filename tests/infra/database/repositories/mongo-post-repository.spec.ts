import { Collection } from 'mongodb';
import {
	MongoHelper,
	MongoPostRepository,
} from '../../../../src/infra/database';
import { mockPost } from '../../../domain/mocks';

const makeSut = () => new MongoPostRepository();

describe('MongoGroupRepository', () => {
	let postsCollection: Collection;

	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL as string);
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		postsCollection = await MongoHelper.getCollection('posts');
	});

	describe('add()', () => {
		test('should add a group on success', async () => {
			const sut = makeSut();
			await sut.add(mockPost());
			const count = await postsCollection.countDocuments();
			expect(count).toBe(1);
		});
	});
});
