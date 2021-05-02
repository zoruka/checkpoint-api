import { Account, DatabaseDocument } from '../models';

export interface AddAccount {
	add: (params: AddAccount.Params) => Promise<AddAccount.Result>;
}

export namespace AddAccount {
	export type Params = Omit<Account.Model, keyof DatabaseDocument.Record>;

	export type Result = Account.Model;
}
