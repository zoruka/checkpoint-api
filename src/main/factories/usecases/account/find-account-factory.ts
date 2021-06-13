import { DbFindAccount } from '../../../../data/usecases';
import { FindAccount } from '../../../../domain/usecases';
import { makeMongoAccountRepository } from '../../infras';

export const makeFindAccount = (): FindAccount => {
	const accountRepository = makeMongoAccountRepository();

	return new DbFindAccount(accountRepository);
};
