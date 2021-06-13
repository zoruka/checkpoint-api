import { Group } from '../../../../domain/models';

export interface AddGroupBindingRepository {
	addBinding: (
		params: AddGroupBindingRepository.Params
	) => Promise<AddGroupBindingRepository.Result>;
}

export namespace AddGroupBindingRepository {
	export type Params = Omit<Group.Binding, 'id'>;
	export type Result = Group.Model;
}
