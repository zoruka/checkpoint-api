import { Group } from '../../models';

export interface AddGroup {
	add: (params: AddGroup.Params) => Promise<AddGroup.Result>;
}

export namespace AddGroup {
	export type Params = {
		adminId: string;
		name: string;
	};

	export type Result = Group.Model;
}
