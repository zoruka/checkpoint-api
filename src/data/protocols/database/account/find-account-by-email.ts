import { Account } from '../../../../domain/models';

export interface FindAccountByEmailRepository {
	findByEmail: (
		email: FindAccountByEmailRepository.Params
	) => Promise<FindAccountByEmailRepository.Result>;
}

export namespace FindAccountByEmailRepository {
	export type Params = string;
	export type Result = Account.Model;
}
