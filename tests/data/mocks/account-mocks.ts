import {
	AddAccountRepository,
	FindAccountByEmailRepository,
	FindAccountByUsernameRepository,
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
			id: datatype.uuid(),
		};
		return this.result;
	}
}

export class FindAccountRepositorySpy implements FindAccountRepository {
	result?: FindAccountRepository.Result;

	async findOne(
		id: FindAccountRepository.Params
	): Promise<FindAccountRepository.Result> {
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

export class FindAccountByEmailRepositorySpy
	implements FindAccountByEmailRepository
{
	result?: FindAccountByEmailRepository.Result;

	async findByEmail(
		email: FindAccountByEmailRepository.Params
	): Promise<FindAccountByEmailRepository.Result> {
		this.result = mockAccount({ email });
		return this.result;
	}
}

export class FindAccountByUsernameRepositorySpy
	implements FindAccountByUsernameRepository
{
	result?: FindAccountByUsernameRepository.Result;

	async findByUsername(
		username: FindAccountByUsernameRepository.Params
	): Promise<FindAccountByUsernameRepository.Result> {
		this.result = mockAccount({ username });
		return this.result;
	}
}
