import { FindAccountGroupsController } from '../../../../presentation/controllers';
import { makeFindAccountGroups } from '../../usecases';
import { makeFindAccountGroupsValidation } from '../../validaton';

export const makeFindAccountGroupsController =
	(): FindAccountGroupsController => {
		return new FindAccountGroupsController(
			makeFindAccountGroupsValidation(),
			makeFindAccountGroups()
		);
	};
