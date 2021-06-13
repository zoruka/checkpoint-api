import { Account } from '../../models';

export interface FindAccount {
	findOne: (params: FindAccount.Params) => Promise<FindAccount.Result>;
}

export namespace FindAccount {
	export type Params = {
		id: string;
	};

	export type Result = Account.Model;
}
