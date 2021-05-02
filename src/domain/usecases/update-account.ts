import { Account, DatabaseDocument } from '../models';

export interface UpdateAccount {
	update: (params: UpdateAccount.Params) => Promise<UpdateAccount.Result>;
}

export namespace UpdateAccount {
	export type Params = Partial<
		Omit<Account.Model, keyof Omit<DatabaseDocument.Record, 'id'>>
	>;

	export type Result = Account.Model;
}
