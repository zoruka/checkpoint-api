import { FindAccountController } from '../../../../presentation/controllers';
import { makeFindAccount } from '../../usecases/account/find-account-factory';
import { makeFindAccountValidation } from '../../validaton/find-account-validation-factory';

export const makeFindAccountController = (): FindAccountController => {
	const validation = makeFindAccountValidation();
	const findAccount = makeFindAccount();

	return new FindAccountController(validation, findAccount);
};
