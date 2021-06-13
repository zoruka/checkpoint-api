import { Group, DatabaseDocument } from '../../models';

export interface UnbindGroupAccount {
	bindAccountId: (
		params: UnbindGroupAccount.Params
	) => Promise<UnbindGroupAccount.Result>;
}

export namespace UnbindGroupAccount {
	export type Params = {
		accountId: string;
		groupId: string;
	};

	export type Result = void;
}
