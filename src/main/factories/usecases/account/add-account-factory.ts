import { DbAddAccount } from '../../../../data/usecases';
import { AddAccount } from '../../../../domain/usecases';
import { makeBcryptAdapter, makeMongoAccountRepository } from '../../adapters';

export const makeAddAccount = (): AddAccount => {
	const accountRepository = makeMongoAccountRepository();
	const crypto = makeBcryptAdapter();
	return new DbAddAccount(
		accountRepository,
		accountRepository,
		accountRepository,
		crypto
	);
};
