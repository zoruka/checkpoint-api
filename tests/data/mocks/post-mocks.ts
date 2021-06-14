import { AddPostRepository } from '../../../src/data/protocols';
import { mockPost } from '../../domain/mocks';

export class AddPostRepositorySpy implements AddPostRepository {
	result?: AddPostRepository.Result;

	async add(): Promise<AddPostRepository.Result> {
		this.result = mockPost();
		return this.result;
	}
}
