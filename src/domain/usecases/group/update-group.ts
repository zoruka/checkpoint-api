import { Group } from '../../models';

export interface UpdateGroup {
	update: (params: UpdateGroup.Params) => Promise<UpdateGroup.Result>;
}

export namespace UpdateGroup {
	export type Params = {
		id: string;
		adminId?: string;
		name?: string;
	};

	export type Result = Group.Model;
}
