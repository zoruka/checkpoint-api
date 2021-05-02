import {
	AddAccountRepository,
	FindAccountRepository,
	UpdateAccountRepository,
} from '../../../src/data/protocols/database';
import { datatype } from 'faker';
import { mockAccount } from '../../domain/mocks/account';

export class AddAccountRepositorySpy implements AddAccountRepository {
	async add(
		params: AddAccountRepository.Params
	): Promise<AddAccountRepository.Result> {
		return {
			...params,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: datatype.uuid(),
		};
	}
}

export class FindAccountRepositorySpy implements FindAccountRepository {
	async findOne({
		id,
	}: FindAccountRepository.Params): Promise<FindAccountRepository.Result> {
		return mockAccount({ id });
	}
}

export class UpdateAccountRepositorySpy implements UpdateAccountRepository {
	async update(
		params: UpdateAccountRepository.Params
	): Promise<UpdateAccountRepository.Result> {
		return mockAccount(params);
	}
}
