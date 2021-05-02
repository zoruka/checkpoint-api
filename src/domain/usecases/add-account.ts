import { Account, DatabaseDocument } from '../models';

export interface AddAccount {
	add: (params: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
	export type Params = Exclude<Account.Model, DatabaseDocument.Record>;

	export type Result = void;
}
