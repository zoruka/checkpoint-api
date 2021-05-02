import { Auth } from '../../../../domain/usecases';

export interface AuthAccountRepository {
	auth: (
		params: AuthAccountRepository.Params
	) => Promise<AuthAccountRepository.Result>;
}

export namespace AuthAccountRepository {
	export type Params = Auth.Params;
	export type Result = Auth.Result;
}
