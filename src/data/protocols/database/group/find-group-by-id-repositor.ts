import { Group } from '../../../../domain/models';

export interface FindGroupByIdRepository {
	findById: (
		id: FindGroupByIdRepository.Params
	) => Promise<FindGroupByIdRepository.Result>;
}

export namespace FindGroupByIdRepository {
	export type Params = string;
	export type Result = Group.Model | null;
}
