import {
	AddGroupBindingRepository,
	AddGroupRepository,
	BinderGroupRepository,
	FindGroupBindingRepository,
	FindGroupByIdRepository,
	FindGroupsByAccountRepository,
	FindGroupsRepository,
	GenerateGroupTagRepository,
	UpdateGroupRepository,
} from '../../../src/data/protocols';
import { mockGroup, mockGroupBinding } from '../../domain/mocks';

export class AddGroupBindingRepositorySpy implements AddGroupBindingRepository {
	result?: AddGroupBindingRepository.Result;

	async addBinding(): Promise<AddGroupBindingRepository.Result> {
		this.result = mockGroupBinding();
		return this.result;
	}
}

export class AddGroupRepositorySpy implements AddGroupRepository {
	result?: AddGroupRepository.Result;

	async add(): Promise<AddGroupRepository.Result> {
		this.result = mockGroup();
		return this.result;
	}
}

export class BinderGroupRepositorySpy implements BinderGroupRepository {
	result?: BinderGroupRepository.Result;

	async bind(): Promise<BinderGroupRepository.Result> {
		this.result = mockGroup();
		return this.result;
	}
}

export class FindGroupBindingRepositorySpy
	implements FindGroupBindingRepository
{
	result?: FindGroupBindingRepository.Result;

	async findBinding(): Promise<FindGroupBindingRepository.Result> {
		this.result = mockGroupBinding();
		return this.result;
	}
}

export class FindGroupByIdRepositorySpy implements FindGroupByIdRepository {
	result?: FindGroupByIdRepository.Result;

	async findById(): Promise<FindGroupByIdRepository.Result> {
		this.result = mockGroup();
		return this.result;
	}
}

export class FindGroupsRepositorySpy implements FindGroupsRepository {
	result?: FindGroupsRepository.Result;

	async find(): Promise<FindGroupsRepository.Result> {
		this.result = [mockGroup()];
		return this.result;
	}
}

export class GenerateGroupTagRepositorySpy
	implements GenerateGroupTagRepository
{
	result?: GenerateGroupTagRepository.Result;

	async generateTag(): Promise<GenerateGroupTagRepository.Result> {
		this.result = 'tag';
		return this.result;
	}
}

export class UpdateGroupRepositorySpy implements UpdateGroupRepository {
	result?: UpdateGroupRepository.Result;

	async update(): Promise<UpdateGroupRepository.Result> {
		this.result = mockGroup();
		return this.result;
	}
}

export class FindGroupsByAccountRepositorySpy
	implements FindGroupsByAccountRepository
{
	result?: FindGroupsByAccountRepository.Result;

	async findByAccount(): Promise<FindGroupsByAccountRepository.Result> {
		this.result = [mockGroup()];
		return this.result;
	}
}
