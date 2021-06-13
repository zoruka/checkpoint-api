import { Group } from '../../models';

export interface FindGroups {
	find: (searchValue: FindGroups.Params) => Promise<FindGroups.Result>;
}

export namespace FindGroups {
	export type Params = string;

	export type Result = Group.Model[];
}
