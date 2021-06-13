import { datatype, name } from 'faker';
import {
	AddAccount,
	Auth,
	AuthByToken,
	FindAccount,
} from '../../../src/domain/usecases';
import { mockAccount } from '../../domain/mocks';

export class AuthSpy implements Auth {
	result?: Auth.Result;
	async auth(): Promise<Auth.Result> {
		this.result = {
			accessToken: datatype.string(32),
			name: name.findName(),
			userId: datatype.uuid(),
		};
		return this.result;
	}
}

export class AuthByTokenSpy implements AuthByToken {
	result?: AuthByToken.Result;
	async authByToken(): Promise<AuthByToken.Result> {
		this.result = mockAccount();
		return this.result;
	}
}

export class AddAccountSpy implements AddAccount {
	result?: AddAccount.Result;
	async add(): Promise<AddAccount.Result> {
		this.result = mockAccount();
		return this.result;
	}
}

export class FindAccountSpy implements FindAccount {
	result?: FindAccount.Result;
	async findOne(): Promise<FindAccount.Result> {
		this.result = mockAccount();
		return this.result;
	}
}
