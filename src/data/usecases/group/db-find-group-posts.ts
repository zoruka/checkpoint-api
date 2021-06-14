import { FindGroupPosts } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	FindAccountRepository,
	FindGroupByIdRepository,
	FindPostsByGroupRepository,
} from '../../protocols';

export class DbFindGroupPosts implements FindGroupPosts {
	constructor(
		private readonly findPostsByGroup: FindPostsByGroupRepository,
		private readonly findGroupByIdRepository: FindGroupByIdRepository,
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async findPosts(
		groupId: FindGroupPosts.Params
	): Promise<FindGroupPosts.Result> {
		const group = await this.findGroupByIdRepository.findById(groupId);
		if (!group) throw new DatabaseError.NotFound('Group id not found');

		const posts = await this.findPostsByGroup.findByGroup(groupId);

		const result: FindGroupPosts.Result = [];

		for (const { accountId, ...post } of posts) {
			const account = await this.findAccountRepository.findOne(accountId);

			if (account) {
				result.push({
					account,
					...post,
				});
			}
		}

		return result;
	}
}
