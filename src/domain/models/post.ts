import { DatabaseDocument } from './database-document';

export namespace Post {
	export interface Model extends DatabaseDocument.Record {
		text: string;
		media: string;
		userId: string;
		groupId: string;
	}
}
