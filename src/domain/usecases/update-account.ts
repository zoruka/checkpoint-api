import { Account, DatabaseDocument } from '../models';

export interface UpdateAccount {
	update: (params: UpdateAccount.Params) => Promise<UpdateAccount.Result>;
}

export namespace UpdateAccount {
	export type Params = Partial<
		Exclude<Account.Model, DatabaseDocument.Record>
	> & { id: string };

	export type Result = void;
}
