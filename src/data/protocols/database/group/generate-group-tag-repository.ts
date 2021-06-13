export interface GenerateGroupTagRepository {
	generateTag: () => Promise<GenerateGroupTagRepository.Result>;
}

export namespace GenerateGroupTagRepository {
	export type Params = void;
	export type Result = string;
}
