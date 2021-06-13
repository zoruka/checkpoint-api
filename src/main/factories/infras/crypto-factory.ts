import { BcryptAdapter, JwtAdapter } from '../../../infra/crypto';
import env from '../../config/env';

export const makeBcryptAdapter = (): BcryptAdapter => {
	return new BcryptAdapter(8);
};

export const makeJwtAdapter = (): JwtAdapter => {
	return new JwtAdapter(env.jwtKey);
};
