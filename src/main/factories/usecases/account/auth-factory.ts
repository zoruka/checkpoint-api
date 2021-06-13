import { DbAuthAccount } from '../../../../data/usecases';
import { Auth } from '../../../../domain/usecases';
import {
	makeBcryptAdapter,
	makeJwtAdapter,
	makeMongoAccountRepository,
} from '../../infras';

export const makeAuth = (): Auth => {
	const accountRepository = makeMongoAccountRepository();
	const jwtAdapter = makeJwtAdapter();
	const bcryptAdapter = makeBcryptAdapter();

	return new DbAuthAccount(accountRepository, bcryptAdapter, jwtAdapter);
};
