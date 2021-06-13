import { Account } from '../../domain/models';
import { adaptMiddleware } from '../adapters';
import { makeAuthMiddleware } from '../factories/middlewares';

export const profileAuth = adaptMiddleware(
	makeAuthMiddleware(Account.Access.Profile)
);
