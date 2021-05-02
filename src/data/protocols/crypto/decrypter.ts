export interface Decrypter {
	decrypt: (params: Decrypter.Params) => Promise<Decrypter.Result>;
}

export namespace Decrypter {
	export type Params = {
		ciphertext: string;
	};

	export type Result = {
		payload: string;
		iat?: number;
		exp?: number;
	};
}
