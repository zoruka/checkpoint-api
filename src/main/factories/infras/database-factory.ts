import {
	MongoAccountRepository,
	MongoGroupRepository,
} from '../../../infra/database';

export const makeMongoAccountRepository = (): MongoAccountRepository => {
	return new MongoAccountRepository();
};

export const makeMongoGroupRepository = (): MongoGroupRepository => {
	return new MongoGroupRepository();
};
