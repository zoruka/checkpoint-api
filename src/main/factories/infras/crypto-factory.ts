import { BcryptAdapter, JwtAdapter } from '../../../infra/crypto';

export const makeBcryptAdapter = (): BcryptAdapter => {
	return new BcryptAdapter(8);
};

export const makeJwtAdapter = (): JwtAdapter => {
	return new JwtAdapter('secret');
};
