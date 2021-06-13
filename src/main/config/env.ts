export default {
	mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/checkpoint',
	port: process.env.SERVER_POT || '4003',
	jwtKey: process.env.JWT_KEY || 'secret',
};
