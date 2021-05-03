import { AddAccountRepository } from '../../../../data/protocols';
import { Account } from '../../../../domain/models';
import { MongoHelper } from '../mongo-helper';

export class MongoAccountRepository implements AddAccountRepository {
	async add(
		params: AddAccountRepository.Params
	): Promise<AddAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('account');

		const newAccount: Omit<Account.Model, 'id'> = {
			...params,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const result = await accountCollection.insertOne(newAccount);

		return {
			...newAccount,
			id: result.insertedId,
		};
	}
}
