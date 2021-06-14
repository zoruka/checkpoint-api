import { Account, DatabaseDocument } from '../../models';

export interface UpdateAccount {
	update: (params: UpdateAccount.Params) => Promise<UpdateAccount.Result>;
}

export namespace UpdateAccount {
	export type Params = {
		id: string;

		email?: string;
		username?: string;
		password?: string;
		name?: string;

		twitch?: string | null;
		steam?: string | null;
	};

	export type Result = Account.Model;
}
