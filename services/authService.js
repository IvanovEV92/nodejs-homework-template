const User = require('./userService');
const jwt = require('jsonwebtoken'); // библиотека для создания токенов
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // секрет для подписи токена

// Вход юзера
const login = async ({ email, password }) => {
	const user = await User.findUserByEmail(email);
	const isValidPassword = await user?.validPassword(password);

	// Если юзера нет или пароль не валидный - null вместо токена
	if (!user || !isValidPassword) {
		return null;
	}

	// Иначе - создаем, подписываем и возвращаем токен с временем жизни
	const id = user.id;
	const payload = { id };
	const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

	await User.updateToken(id, token);
	return token;
};

// Выход юзера
const logout = async id => {
	const data = await User.updateToken(id, null);
	return data;
};

module.exports = {
	login,
	logout,
};
