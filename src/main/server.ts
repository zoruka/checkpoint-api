import { MongoHelper } from '../infra/database';
import { buildApp } from './config/app';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
	.then(buildApp)
	.then((app) =>
		app.listen(env.port, () => console.log(`Server started on ${env.port}`))
	);
