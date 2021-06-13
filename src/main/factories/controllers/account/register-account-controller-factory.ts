import { RegisterAccountController } from '../../../../presentation/controllers';
import { makeAddAccount, makeAuth } from '../../usecases';
import { makeRegisterAccountValidation } from '../../validaton';

export const makeRegisterAccountController = (): RegisterAccountController => {
	const registerAccountValidation = makeRegisterAccountValidation();
	const addAccount = makeAddAccount();
	const auth = makeAuth();

	return new RegisterAccountController(
		registerAccountValidation,
		addAccount,
		auth
	);
};
