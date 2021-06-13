import { Account } from '../models';

export interface AuthByToken {
	authByToken: (
		accessToken: AuthByToken.Params
	) => Promise<AuthByToken.Result>;
}

export namespace AuthByToken {
	export type Params = string;
	export type Result = Account.Model;
}
