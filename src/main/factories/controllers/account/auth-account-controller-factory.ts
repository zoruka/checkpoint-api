import { AuthAccountController } from '../../../../presentation/controllers';
import { makeAuth } from '../../usecases';
import { makeAuthAccountValidation } from '../../validaton';

export const makeAuthAccountController = (): AuthAccountController => {
	const registerAccountValidation = makeAuthAccountValidation();
	const auth = makeAuth();

	return new AuthAccountController(registerAccountValidation, auth);
};
