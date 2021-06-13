import { DbUpdateAccount } from '../../../../data/usecases';
import { UpdateAccount } from '../../../../domain/usecases';
import { makeBcryptAdapter, makeMongoAccountRepository } from '../../infras';

export const makeUpdateAccount = (): UpdateAccount => {
	const accountRepository = makeMongoAccountRepository();
	const bcryptAdapter = makeBcryptAdapter();
	return new DbUpdateAccount(
		accountRepository,
		accountRepository,
		accountRepository,
		accountRepository,
		bcryptAdapter
	);
};
