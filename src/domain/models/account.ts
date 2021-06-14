import { DatabaseDocument } from './database-document';

export namespace Account {
	export enum Access {
		Admin,
		Profile,
	}

	export interface Model extends DatabaseDocument.Record {
		access: Access;
		username: string;
		password: string;
		email: string;
		name: string;
		avatarPath: string | null;
		level: number;

		twitch: string | null;
		steam: string | null;
	}

	export type Short = Pick<Account.Model, 'name' | 'username' | 'id'>;
}
