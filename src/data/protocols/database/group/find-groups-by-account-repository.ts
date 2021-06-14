import { Group } from '../../../../domain/models';

export interface FindGroupsByAccountRepository {
	findByAccount: (
		accountId: FindGroupsByAccountRepository.Params
	) => Promise<FindGroupsByAccountRepository.Result>;
}

export namespace FindGroupsByAccountRepository {
	export type Params = string;
	export type Result = Group.Model[];
}
