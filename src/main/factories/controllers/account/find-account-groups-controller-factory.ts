import { FindAccountGroupsController } from '../../../../presentation/controllers';
import { makeFindAccountGroups } from '../../usecases';
import { makeFindGroupAccountsValidation } from '../../validaton';

export const makeFindAccountGroupsController =
	(): FindAccountGroupsController => {
		return new FindAccountGroupsController(
			makeFindGroupAccountsValidation(),
			makeFindAccountGroups()
		);
	};
