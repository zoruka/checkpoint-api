import { Account } from '../../../../domain/models';

export interface FetchAccountsRepository {
	fetchIds: (
		ids: FetchAccountsRepository.Params
	) => Promise<FetchAccountsRepository.Result>;
}

export namespace FetchAccountsRepository {
	export type Params = string[];
	export type Result = Account.Short[];
}
