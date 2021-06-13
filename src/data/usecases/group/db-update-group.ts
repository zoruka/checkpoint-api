import { UpdateGroup } from '../../../domain/usecases';
import { DatabaseError } from '../../errors';
import {
	FindAccountRepository,
	FindGroupByIdRepository,
	UpdateGroupRepository,
} from '../../protocols';

export class DbUpdateGroup implements UpdateGroup {
	constructor(
		private readonly findGroupByIdRepository: FindGroupByIdRepository,
		private readonly updateGroupRepository: UpdateGroupRepository,
		private readonly findAccountRepository: FindAccountRepository
	) {}

	async update(params: UpdateGroup.Params): Promise<UpdateGroup.Result> {
		const currentGroup = await this.findGroupByIdRepository.findById(
			params.id
		);
		if (!currentGroup)
			throw new DatabaseError.NotFound('Group id not found');

		if (params.adminId) {
			const admin = await this.findAccountRepository.findOne(
				params.adminId
			);
			if (!admin)
				throw new DatabaseError.NotFound('Account id not found');
		}
		const result = await this.updateGroupRepository.update({
			id: params.id,
			adminId: params.adminId || currentGroup.adminId,
			name: params.name || currentGroup.name,
			updatedAt: new Date(),
		});

		return result;
	}
}
