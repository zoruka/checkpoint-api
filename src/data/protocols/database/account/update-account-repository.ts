import { Account } from '../../../../domain/models';

export interface UpdateAccountRepository {
	update: (
		params: UpdateAccountRepository.Params
	) => Promise<UpdateAccountRepository.Result>;
}

export namespace UpdateAccountRepository {
	export type Params = Account.Model;
	export type Result = Account.Model;
}
