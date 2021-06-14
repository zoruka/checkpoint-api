import { RegisterGroupController } from '../../../../presentation/controllers/group';
import { makeAddGroup } from '../../usecases/group';
import { makeRegisterGroupValidation } from '../../validaton';

export const makeRegisterGroupController = (): RegisterGroupController => {
	return new RegisterGroupController(
		makeRegisterGroupValidation(),
		makeAddGroup()
	);
};
