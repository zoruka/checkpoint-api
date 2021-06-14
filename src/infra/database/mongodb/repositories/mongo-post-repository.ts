import { AddPostRepository } from '../../../../data/protocols';
import { MongoHelper } from '../mongo-helper';

export class MongoPostRepository implements AddPostRepository {
	async add(
		params: AddPostRepository.Params
	): Promise<AddPostRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('posts');
		const result = await accountCollection.insertOne(params);
		return {
			...params,
			id: result.insertedId,
		};
	}
}
