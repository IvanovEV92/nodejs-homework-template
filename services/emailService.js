// Сервисы по отправке письма юзеру
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

// Создание шаблона
const createTemplate = (verifyToken, email) => {
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'Contacts',
			link: 'http://localhost:3000',
		},
	});

	const template = {
		body: {
			name: email,
			intro: 'Welcome',
			action: {
				instructions: 'Please click here:',
				button: {
					color: '##2767f2',
					text: 'Confirm your account',
					link: `http://localhost:3000/api/users/verify/${verifyToken}`, // Вынести в переменные окружения?
				},
			},
		},
	};

	const emailBody = mailGenerator.generate(template);
	return emailBody;
};

const sendEmail = async (verifyToken, email) => {
	const emailBody = createTemplate(verifyToken, email);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'ivanov191192@ukr.net',
			pass: process.env.PASS,
		},
	});

	const mailOptions = {
		from: 'ivanov191192@ukr.net',
		to: email,
		subject: 'Please confirm your email',
		html: emailBody,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		throw new Error(`Smth wrong with email service: ${error.response}`);
	}
};

module.exports = {
	sendEmail,
};
