import { FindGroups } from '../../../domain/usecases';
import { FindGroupsRepository } from '../../protocols/database/group/find-groups-repository';

export class DbFindGroups implements FindGroups {
	constructor(private readonly findGroupsRepository: FindGroupsRepository) {}

	async find(searchValue: FindGroups.Params): Promise<FindGroups.Result> {
		return this.findGroupsRepository.find(searchValue);
	}
}
