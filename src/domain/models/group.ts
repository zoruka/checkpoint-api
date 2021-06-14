import { DatabaseDocument } from './database-document';

export namespace Group {
	export interface Binding extends DatabaseDocument.Record {
		groupId: string;
		accounts: {
			[userId: string]: Date | string | null;
		};
	}

	export interface Model extends DatabaseDocument.Record {
		name: string;
		tag: string;
		adminId: string;
		bindingId: string;
	}
}
