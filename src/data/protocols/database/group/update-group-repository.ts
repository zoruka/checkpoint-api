import { Account } from '../../../../domain/models';
import { UpdateGroup } from '../../../../domain/usecases';

export interface UpdateGroupRepository {
	update: (
		params: UpdateGroupRepository.Params
	) => Promise<UpdateGroupRepository.Result>;
}

export namespace UpdateGroupRepository {
	export type Params = Required<UpdateGroup.Params> & {
		updatedAt: Date;
	};
	export type Result = Account.Model;
}
