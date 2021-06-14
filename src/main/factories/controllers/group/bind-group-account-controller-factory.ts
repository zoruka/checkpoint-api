import { BindGroupController } from '../../../../presentation/controllers/group';
import { makeBindGroupAccount } from '../../usecases/group';
import { makeBindGroupAccountValidation } from '../../validaton/bind-group-account-validation-factory';

export const makeBindGroupAccountController = (): BindGroupController => {
	return new BindGroupController(
		makeBindGroupAccountValidation(),
		makeBindGroupAccount()
	);
};
