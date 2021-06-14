import { DbBindGroupAccount } from '../../../../data/usecases';
import { BindGroupAccount } from '../../../../domain/usecases';
import {
	makeMongoAccountRepository,
	makeMongoGroupRepository,
} from '../../infras';

export const makeBindGroupAccount = (): BindGroupAccount => {
	const groupRepository = makeMongoGroupRepository();
	const accountRepository = makeMongoAccountRepository();
	return new DbBindGroupAccount(
		groupRepository,
		accountRepository,
		groupRepository
	);
};
