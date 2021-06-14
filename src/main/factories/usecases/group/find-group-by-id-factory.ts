import { DbFindGroupById } from '../../../../data/usecases';
import { FindGroupById } from '../../../../domain/usecases';
import { makeMongoGroupRepository } from '../../infras';

export const makeFindGroupById = (): FindGroupById => {
	const groupRepository = makeMongoGroupRepository();
	return new DbFindGroupById(groupRepository);
};
