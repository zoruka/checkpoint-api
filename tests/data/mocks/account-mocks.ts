import {
	AddAccountRepository,
	FindAccountRepository,
	UpdateAccountRepository,
} from '../../../src/data/protocols/database';
import { datatype } from 'faker';
import { mockAccount } from '../../domain/mocks/account';

export class AddAccountRepositorySpy implements AddAccountRepository {
	result?: AddAccountRepository.Result;

	async add(
		params: AddAccountRepository.Params
	): Promise<AddAccountRepository.Result> {
		this.result = {
			...params,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: datatype.uuid(),
		};
		return this.result;
	}
}

export class FindAccountRepositorySpy implements FindAccountRepository {
	result?: FindAccountRepository.Result;

	async findOne({
		id,
	}: FindAccountRepository.Params): Promise<FindAccountRepository.Result> {
		this.result = mockAccount({ id });
		return this.result;
	}
}

export class UpdateAccountRepositorySpy implements UpdateAccountRepository {
	result?: UpdateAccountRepository.Result;

	async update(
		params: UpdateAccountRepository.Params
	): Promise<UpdateAccountRepository.Result> {
		this.result = mockAccount(params);
		return this.result;
	}
}
