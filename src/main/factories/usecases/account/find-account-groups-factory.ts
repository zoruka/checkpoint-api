import { DbFindAccountGroups } from '../../../../data/usecases';
import { FindAccountGroups } from '../../../../domain/usecases';
import {
	makeMongoAccountRepository,
	makeMongoGroupRepository,
} from '../../infras';

export const makeFindAccountGroups = (): FindAccountGroups => {
	const accountRepository = makeMongoAccountRepository();
	const groupRepository = makeMongoGroupRepository();
	return new DbFindAccountGroups(groupRepository, accountRepository);
};
