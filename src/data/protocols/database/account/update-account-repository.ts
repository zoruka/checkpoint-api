import { Account } from '../../../../domain/models';
import { UpdateAccount } from '../../../../domain/usecases';

export interface UpdateAccountRepository {
	update: (
		params: UpdateAccountRepository.Params
	) => Promise<UpdateAccountRepository.Result>;
}

export namespace UpdateAccountRepository {
	export type Params = Required<UpdateAccount.Params> & {
		updatedAt: Date;
	};
	export type Result = Account.Model;
}
