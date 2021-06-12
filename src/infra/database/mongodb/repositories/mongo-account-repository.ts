import {
	AddAccountRepository,
	FindAccountByEmailRepository,
	FindAccountByUsernameRepository,
	FindAccountRepository,
	UpdateAccountRepository,
} from '../../../../data/protocols';
import { MongoHelper } from '../mongo-helper';

export class MongoAccountRepository
	implements
		AddAccountRepository,
		FindAccountRepository,
		FindAccountByEmailRepository,
		FindAccountByUsernameRepository,
		UpdateAccountRepository
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
		const account = await accountCollection.findOne({ _id: id });
		return account && MongoHelper.map(account);
	}

	async findByEmail(
		email: FindAccountByEmailRepository.Params
	): Promise<FindAccountByEmailRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const account = await accountCollection.findOne({ email });
		return account && MongoHelper.map(account);
	}

	async findByUsername(
		username: FindAccountByUsernameRepository.Params
	): Promise<FindAccountByUsernameRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const account = await accountCollection.findOne({ username });
		return account && MongoHelper.map(account);
	}

	async update({
		id,
		...updateParams
	}: UpdateAccountRepository.Params): Promise<UpdateAccountRepository.Result> {
		const accountCollection = await MongoHelper.getCollection('accounts');
		const updatedAccount = await accountCollection.findOneAndUpdate(
			{ _id: id },
			{
				$set: updateParams,
			}
		);
		return updatedAccount.value && MongoHelper.map(updatedAccount.value);
	}
}
