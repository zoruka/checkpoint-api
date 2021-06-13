import { Group, DatabaseDocument } from '../../models';

export interface BindGroupAccount {
	bindAccountId: (
		params: BindGroupAccount.Params
	) => Promise<BindGroupAccount.Result>;
}

export namespace BindGroupAccount {
	export type Params = {
		accountId: string;
		groupId: string;
	};

	export type Result = void;
}
