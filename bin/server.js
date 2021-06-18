const app = require('../app');
const connectMongo = require('../db/connection');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectMongo();

		app.listen(PORT, () => {
			console.log(`Server running. Use our API on port: ${PORT}`);
		});
	} catch (err) {
		console.log(`Server not running. Error message: ${err.message}`);
	}
};

start();
