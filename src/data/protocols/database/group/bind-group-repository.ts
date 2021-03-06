import { Group } from '../../../../domain/models';

export interface BinderGroupRepository {
	bind: (
		params: BinderGroupRepository.Params
	) => Promise<BinderGroupRepository.Result>;
}

export namespace BinderGroupRepository {
	export type Params = {
		groupId: string;
		accountId: string;
		bind: boolean;
	};
	export type Result = Group.Model;
}
