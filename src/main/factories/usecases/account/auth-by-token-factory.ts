import { DbAuthByToken } from '../../../../data/usecases';
import { AuthByToken } from '../../../../domain/usecases';
import { makeJwtAdapter, makeMongoAccountRepository } from '../../infras';

export const makeAuthByToken = (): AuthByToken => {
	const accountRepository = makeMongoAccountRepository();
	const jwtAdapter = makeJwtAdapter();

	return new DbAuthByToken(jwtAdapter, accountRepository);
};
