import {
	MongoAccountRepository,
	MongoGroupRepository,
	MongoPostRepository,
} from '../../../infra/database';

export const makeMongoAccountRepository = (): MongoAccountRepository => {
	return new MongoAccountRepository();
};

export const makeMongoGroupRepository = (): MongoGroupRepository => {
	return new MongoGroupRepository();
};

export const makeMongoPostRepository = (): MongoPostRepository => {
	return new MongoPostRepository();
};
