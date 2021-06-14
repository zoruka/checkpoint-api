import { FindGroupAccountsController } from '../../../../presentation/controllers/group';
import { makeFindGroupAccounts } from '../../usecases/group';
import { makeFindGroupAccountsValidation } from '../../validaton';

export const makeFindGroupAccountsController =
	(): FindGroupAccountsController => {
		return new FindGroupAccountsController(
			makeFindGroupAccountsValidation(),
			makeFindGroupAccounts()
		);
	};
