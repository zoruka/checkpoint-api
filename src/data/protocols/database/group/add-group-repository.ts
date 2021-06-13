import { Group } from '../../../../domain/models';

export interface AddGroupRepository {
	add: (
		params: AddGroupRepository.Params
	) => Promise<AddGroupRepository.Result>;
}

export namespace AddGroupRepository {
	export type Params = Omit<Group.Model, 'id'>;
	export type Result = Group.Model;
}
