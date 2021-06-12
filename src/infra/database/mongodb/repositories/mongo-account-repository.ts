import { AccountError, DatabaseError } from '../../../../data/errors';
import {
	AddAccountRepository,
	FindAccountByEmailRepository,
	FindAccountRepository,
} from '../../../../data/protocols';
import { Account } from '../../../../domain/models';
import { MongoHelper } from '../mongo-helper';

export class MongoAccountRepository
	implements
		AddAccountRepository,
		FindAccountRepository,
		FindAccountByEmailRepository
{
	async add(
		params: AddAccountRepository.Params
	): Promise<AddAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const result = await accountCollection.insertOne(params);
		return {
			...params,
			id: result.insertedId,
		};
	}

	async findOne(
		id: FindAccountRepository.Params
	): Promise<FindAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		return accountCollection.findOne({ _id: id });
	}

	async findByEmail(
		email: FindAccountByEmailRepository.Params
	): Promise<FindAccountByEmailRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		return accountCollection.findOne({ email });
	}
}
