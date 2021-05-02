export interface Auth {
	auth: (params: Auth.Params) => Promise<Auth.Result>;
}

export namespace Auth {
	export type Params = {
		username: string;
		password: string;
	};

	export type Result = {
		accessToken: string;
		name: string;
	};
}
