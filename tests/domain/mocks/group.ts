import { name, random } from 'faker';
import { Group } from '../../../src/domain/models';

export const mockGroup = (params: Partial<Group.Model> = {}): Group.Model => ({
	id: params.id || random.alphaNumeric(24),
	createdAt: params.createdAt || new Date(),
	name: params.name || name.findName(),
	updatedAt: params.updatedAt || new Date(),
	tag: params.tag || 'tag',
	adminId: params.adminId || random.alphaNumeric(24),
	bindingId: params.adminId || random.alphaNumeric(24),
});

export const mockGroupBinding = (
	params: Partial<Group.Binding> = {}
): Group.Binding => ({
	id: params.id || random.alphaNumeric(24),
	createdAt: params.createdAt || new Date(),
	updatedAt: params.updatedAt || new Date(),
	users: {
		[random.alphaNumeric(25)]: new Date(),
		[random.alphaNumeric(25)]: null,
	},
});
