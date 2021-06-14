import { Group } from '../../models';

export interface FindAccountGroups {
	findAccountGroups: (
		accountId: FindAccountGroups.Params
	) => Promise<FindAccountGroups.Result>;
}

export namespace FindAccountGroups {
	export type Params = string;

	export type Result = Group.Model[];
}
