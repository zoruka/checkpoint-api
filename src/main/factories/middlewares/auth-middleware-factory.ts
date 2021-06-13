import { Account } from '../../../domain/models';
import { AuthMiddleware } from '../../../presentation/middlewares';
import { makeAuthByToken } from '../usecases';

export const makeAuthMiddleware = (access: Account.Access): AuthMiddleware => {
	return new AuthMiddleware(makeAuthByToken(), access);
};
