import { Account } from '../../../../domain/models';

export interface FindAccountRepository {
	findOne: (
		id: FindAccountRepository.Params
	) => Promise<FindAccountRepository.Result>;
}

export namespace FindAccountRepository {
	export type Params = string;
	export type Result = Account.Model | undefined;
}
