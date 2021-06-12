import { MongoAccountRepository } from '../../../infra/database';

export const makeMongoAccountRepository = (): MongoAccountRepository => {
	return new MongoAccountRepository();
};
