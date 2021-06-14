import { DbFindGroups } from '../../../../data/usecases';
import { FindGroups } from '../../../../domain/usecases';
import { MongoGroupRepository } from '../../../../infra/database';

export const makeFindGroups = (): FindGroups => {
	const groupRepository = new MongoGroupRepository();
	return new DbFindGroups(groupRepository);
};
