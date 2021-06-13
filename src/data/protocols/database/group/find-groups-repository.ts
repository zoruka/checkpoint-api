import { Group } from '../../../../domain/models';

export interface FindGroupsRepository {
	find: (
		searchValue: FindGroupsRepository.Params
	) => Promise<FindGroupsRepository.Result>;
}

export namespace FindGroupsRepository {
	export type Params = string;
	export type Result = Group.Model[];
}
