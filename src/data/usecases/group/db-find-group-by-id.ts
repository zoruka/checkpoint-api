import { FindGroupById } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import { FindGroupByIdRepository } from '../../protocols';

export class DbFindGroupById implements FindGroupById {
	constructor(
		private readonly findGroupByIdRepository: FindGroupByIdRepository
	) {}

	async findById(id: FindGroupById.Params): Promise<FindGroupById.Result> {
		const result = await this.findGroupByIdRepository.findById(id);

		if (!result) throw new DatabaseError.NotFound('Group id not found');

		return result;
	}
}
