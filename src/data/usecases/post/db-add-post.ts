import { AddPost } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	AddPostRepository,
	FindAccountRepository,
	FindGroupByIdRepository,
} from '../../protocols';

export class DbAddPost implements AddPost {
	constructor(
		private readonly addPostRepository: AddPostRepository,
		private readonly findAccountRepository: FindAccountRepository,
		private readonly findGroupByIdRepository: FindGroupByIdRepository
	) {}

	async add(params: AddPost.Params): Promise<AddPost.Result> {
		const account = await this.findAccountRepository.findOne(
			params.accountId
		);
		if (!account) throw new DatabaseError.NotFound('Account id not found');

		const group = await this.findGroupByIdRepository.findById(
			params.groupId
		);
		if (!group) throw new DatabaseError.NotFound('Group id not found');

		const date = new Date();

		return this.addPostRepository.add({
			...params,
			createdAt: date,
			updatedAt: date,
		});
	}
}
