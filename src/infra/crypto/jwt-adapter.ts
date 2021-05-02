import { Decrypter, Encrypter } from '../../data/protocols';

import { sign, verify } from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
	constructor(private readonly secret: string) {}

	async encrypt({
		plaintext,
		expiresIn,
	}: Encrypter.Params): Promise<Encrypter.Result> {
		if (expiresIn) {
			return sign({ payload: plaintext }, this.secret, { expiresIn });
		}
		return sign({ payload: plaintext }, this.secret);
	}

	async decrypt({ ciphertext }: Decrypter.Params): Promise<Decrypter.Result> {
		return verify(ciphertext, this.secret) as Decrypter.Result;
	}
}
