import { Account } from '../../../../domain/models';

export interface FindAccountByUsernameRepository {
	findByUsername: (
		username: FindAccountByUsernameRepository.Params
	) => Promise<FindAccountByUsernameRepository.Result>;
}

export namespace FindAccountByUsernameRepository {
	export type Params = string;
	export type Result = Account.Model;
}
