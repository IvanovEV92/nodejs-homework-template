const mongoose = require('mongoose');

// Подключение к базе
const connectMongo = async () => {
	return await mongoose.connect(process.env.MONGO_URL, {
		useUnifiedTopology: true,
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	});
};

// Консолит подключение к базе
mongoose.connection.on('connected', _ => {
	console.log('Database connection successful');
});

// Обработка ошибки при коннекте
mongoose.connection.on('error', err => {
	console.error(`Database connection error: ${err.code}`);
});

// Консолит отключение от базы
mongoose.connection.on('disconnected', _ => {
	console.log('Database disconnected');
});

// Отключение от базы при событии SIGINT (ctrl + C)
process.on('SIGINT', async () => {
	console.info(
		'\x1b[36m%s\x1b[0m',
		'Connection for DB disconnected and app terminated',
	);
	process.exit(1);
});

module.exports = connectMongo;
