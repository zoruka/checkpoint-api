import { DbFindGroupAccounts } from '../../../../data/usecases';
import { FindGroupAccounts } from '../../../../domain/usecases';
import {
	makeMongoAccountRepository,
	makeMongoGroupRepository,
} from '../../infras';

export const makeFindGroupAccounts = (): FindGroupAccounts => {
	const groupRepository = makeMongoGroupRepository();
	const accountRepository = makeMongoAccountRepository();
	return new DbFindGroupAccounts(
		groupRepository,
		groupRepository,
		accountRepository
	);
};
