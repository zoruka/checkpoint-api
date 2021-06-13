import { UpdateAccountController } from '../../../../presentation/controllers';
import { makeUpdateAccount } from '../../usecases/account';
import { makeUpdateAccountValidation } from '../../validaton';

export const makeUpdateAccountController = (): UpdateAccountController => {
	const validation = makeUpdateAccountValidation();
	const updateAccount = makeUpdateAccount();
	return new UpdateAccountController(validation, updateAccount);
};
