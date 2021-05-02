import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
	client: null as MongoClient | null,
	uri: null as string | null,

	async connect(uri: string): Promise<void> {
		this.uri = uri;
		this.client = await MongoClient.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},

	async disconnect(): Promise<void> {
		await this.client.close();
		this.client = null;
	},

	async getCollection(name: string): Promise<Collection> {
		if (!this.client?.isConnected()) {
			if (!this.uri) throw new Error('Invalid URI');
			await this.connect(this.uri);
		}
		return this.client.db().collection(name);
	},

	map: (data: any): any => {
		const { _id, ...rest } = data;
		return { ...rest, id: _id };
	},

	mapCollection: (collection: any[]): any[] => {
		return collection.map((c) => MongoHelper.map(c));
	},
};
