export interface HashComparer {
	compare: (params: HashComparer.Params) => Promise<HashComparer.Result>;
}

export namespace HashComparer {
	export type Params = {
		plaintext: string;
		digest: string;
	};

	export type Result = boolean;
}
