import { HashComparer, Hasher } from '../../data/protocols';

import { hash, compare } from 'bcrypt';

export class BcryptAdapter implements Hasher, HashComparer {
	constructor(private readonly salt: number) {}

	async hash({ plaintext }: Hasher.Params): Promise<Hasher.Result> {
		return await hash(plaintext, this.salt);
	}

	async compare({
		plaintext,
		digest,
	}: HashComparer.Params): Promise<HashComparer.Result> {
		return await compare(plaintext, digest);
	}
}
