import { Group } from '../../../../domain/models';

export interface FindGroupBindingRepository {
	findBinding: (
		groupId: FindGroupBindingRepository.Params
	) => Promise<FindGroupBindingRepository.Result>;
}

export namespace FindGroupBindingRepository {
	export type Params = string;
	export type Result = Group.Binding | null;
}
