import { Account } from '../../models';

export interface FindGroupAccounts {
	findAccounts: (
		id: FindGroupAccounts.Params
	) => Promise<FindGroupAccounts.Result>;
}

export namespace FindGroupAccounts {
	export type Params = string;

	export type Result = Account.Model[];
}
