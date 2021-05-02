import { datatype, system, internet, name, random } from 'faker';
import { Account } from '../../../src/domain/models';

export const mockAccount = (
	params: Partial<Account.Model> = {}
): Account.Model => ({
	id: params.id || datatype.uuid(),
	access: params.access || Account.Access.Profile,
	avatarPath: params.avatarPath || system.filePath(),
	createdAt: params.createdAt || new Date(),
	email: params.email || internet.email(),
	name: params.name || name.findName(),
	password: params.password || random.alphaNumeric(32),
	updatedAt: params.updatedAt || new Date(),
	username: params.username || name.firstName(),
});