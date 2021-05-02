import { UpdateAccount } from '../../../../domain/usecases';

export interface UpdateAccountRepository {
	update: (
		params: UpdateAccountRepository.Params
	) => Promise<UpdateAccountRepository.Result>;
}

export namespace UpdateAccountRepository {
	export type Params = UpdateAccount.Params;
	export type Result = UpdateAccount.Result;
}
