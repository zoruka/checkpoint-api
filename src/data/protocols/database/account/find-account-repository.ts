import { FindAccount } from '../../../../domain/usecases';

export interface FindAccountRepository {
	findOne: (
		params: FindAccountRepository.Params
	) => Promise<FindAccountRepository.Result>;
}

export namespace FindAccountRepository {
	export type Params = FindAccount.Params;
	export type Result = FindAccount.Result;
}
