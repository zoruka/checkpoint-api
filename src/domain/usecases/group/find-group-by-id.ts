import { Group } from '../../models';

export interface FindGroupById {
	findById: (id: FindGroupById.Params) => Promise<FindGroupById.Result>;
}

export namespace FindGroupById {
	export type Params = string;

	export type Result = Group.Model;
}
