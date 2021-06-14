import { lorem, random } from 'faker';
import { Post } from '../../../src/domain/models';

export const mockPost = (params: Partial<Post.Model> = {}): Post.Model => ({
	id: params.id || random.alphaNumeric(24),
	createdAt: params.createdAt || new Date(),
	updatedAt: params.updatedAt || new Date(),
	groupId: params.groupId || random.alphaNumeric(24),
	accountId: params.accountId || random.alphaNumeric(24),
	media: params.media || random.alphaNumeric(60),
	text: params.text || lorem.paragraph(),
});
