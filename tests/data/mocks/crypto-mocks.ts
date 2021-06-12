import { datatype, random } from 'faker';
import {
	Decrypter,
	Encrypter,
	HashComparer,
	Hasher,
} from '../../../src/data/protocols';

export class HasherSpy implements Hasher {
	result?: Hasher.Result;

	async hash(): Promise<Hasher.Result> {
		this.result = datatype.uuid();
		return this.result;
	}
}

export class HashComparerSpy implements HashComparer {
	result?: HashComparer.Result;
	async compare(): Promise<HashComparer.Result> {
		this.result = true;
		return this.result;
	}
}

export class EncrypterSpy implements Encrypter {
	result?: Encrypter.Result;

	async encrypt(): Promise<Encrypter.Result> {
		this.result = datatype.string(32);
		return this.result;
	}
}

export class DecrypterSpy implements Decrypter {
	result?: Decrypter.Result;

	async decrypt(): Promise<Decrypter.Result> {
		this.result = {
			payload: 'payload',
			exp: datatype.number(99999),
			iat: datatype.number(99999),
		};

		return this.result;
	}
}
