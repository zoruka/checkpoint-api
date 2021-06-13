export interface BindGroupAccount {
	bindAccountId: (
		params: BindGroupAccount.Params
	) => Promise<BindGroupAccount.Result>;
}

export namespace BindGroupAccount {
	export type Params = {
		accountId: string;
		groupId: string;
		bind: boolean;
	};

	export type Result = void;
}
