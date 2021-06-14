import { system, internet, name, random } from 'faker';
import { Account } from '../../../src/domain/models';
import { AddAccount } from '../../../src/domain/usecases';

export const mockAccount = (
	params: Partial<Account.Model> = {}
): Account.Model => ({
	id: params.id || random.alphaNumeric(24),
	access: params.access || Account.Access.Profile,
	avatarPath: params.avatarPath || system.filePath(),
	createdAt: params.createdAt || new Date(),
	email: params.email || internet.email(),
	name: params.name || name.findName(),
	password: params.password || random.alphaNumeric(32),
	updatedAt: params.updatedAt || new Date(),
	username: params.username || name.firstName(),
	twitch: params.twitch || 'twitch',
	steam: params.steam || 'steam',
	level: 0,
});

export const mockAddAccountParams = (
	params: Partial<AddAccount.Params> = {}
): AddAccount.Params => ({
	access: params.access || Account.Access.Profile,
	avatarPath: params.avatarPath || system.filePath(),
	email: params.email || internet.email(),
	name: params.name || name.findName(),
	password: params.password || random.alphaNumeric(32),
	username: params.username || name.firstName(),
	twitch: params.twitch || 'twitch',
	steam: params.steam || 'steam',
	level: 0,
});

export const mockAccountShort = (
	params: Partial<Account.Short> = {}
): Account.Short => ({
	id: params.id || random.alphaNumeric(24),
	name: params.name || name.findName(),
	username: params.username || name.firstName(),
});
