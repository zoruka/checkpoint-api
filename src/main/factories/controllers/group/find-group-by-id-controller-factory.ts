import { FindGroupByIdController } from '../../../../presentation/controllers/group';
import { makeFindGroupById } from '../../usecases/group';
import { makeFindGroupByIdValidation } from '../../validaton';

export const makeFindGroupByIdController = (): FindGroupByIdController => {
	return new FindGroupByIdController(
		makeFindGroupByIdValidation(),
		makeFindGroupById()
	);
};
