import { datatype, name } from 'faker';
import { AddAccount, Auth } from '../../../src/domain/usecases';
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

export class AddAccountSpy implements AddAccount {
	result?: AddAccount.Result;
	async add(): Promise<AddAccount.Result> {
		this.result = mockAccount();
		return this.result;
	}
}
