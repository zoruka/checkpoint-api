import {
	AddPostRepository,
	FindPostsByGroupRepository,
} from '../../../../data/protocols';
import { MongoHelper } from '../mongo-helper';

export class MongoPostRepository
	implements AddPostRepository, FindPostsByGroupRepository
{
	async add(
		params: AddPostRepository.Params
	): Promise<AddPostRepository.Result> {
		const postsCollection = await MongoHelper.getCollection('posts');
		const result = await postsCollection.insertOne(params);
		return {
			...params,
			id: result.insertedId,
		};
	}

	async findByGroup(
		groupId: FindPostsByGroupRepository.Params
	): Promise<FindPostsByGroupRepository.Result> {
		const postsCollection = await MongoHelper.getCollection('posts');
		const result = await postsCollection.find({ groupId }).toArray();
		return result;
	}
}
