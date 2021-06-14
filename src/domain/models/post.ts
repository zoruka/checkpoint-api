import { DatabaseDocument } from './database-document';

export namespace Post {
	export interface Model extends DatabaseDocument.Record {
		text: string;
		media?: string;
		accountId: string;
		groupId: string;
	}
}
