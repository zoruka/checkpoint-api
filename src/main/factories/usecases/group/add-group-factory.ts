import { DbAddGroup } from '../../../../data/usecases';
import { AddGroup } from '../../../../domain/usecases';
import {
	makeMongoAccountRepository,
	makeMongoGroupRepository,
} from '../../infras';

export const makeAddGroup = (): AddGroup => {
	const groupRepository = makeMongoGroupRepository();
	const accountRepository = makeMongoAccountRepository();

	return new DbAddGroup(
		groupRepository,
		groupRepository,
		groupRepository,
		accountRepository
	);
};
