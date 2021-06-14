import { FindGroupsController } from '../../../../presentation/controllers/group';
import { makeFindGroups } from '../../usecases/group/find-groups-factory';
import { makeFindGroupsValidation } from '../../validaton';

export const makeFindGroupsController = (): FindGroupsController => {
	return new FindGroupsController(
		makeFindGroupsValidation(),
		makeFindGroups()
	);
};
