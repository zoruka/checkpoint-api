import { Account } from '../../../../domain/models';

export interface AddAccountRepository {
	add: (
		params: AddAccountRepository.Params
	) => Promise<AddAccountRepository.Result>;
}

export namespace AddAccountRepository {
	export type Params = Omit<Account.Model, 'id'>;
	export type Result = Account.Model;
}
