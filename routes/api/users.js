const express = require('express');
const router = express.Router();

const {
	regController,
	loginController,
	logoutController,
	currentUserController,
	subscriptionController,
	avatarController,
	verifyController,
	reVerifyController,
} = require('../../controllers/usersController'); // Контроллеры маршрутов

const {
	regLogValidation,
	subscriptionValidation,
	reVerifyValidation,
} = require('../../middlewares/userValidation'); // Валидации Joi

const { protect } = require('../../middlewares/authProtect'); // Мидлвар на аутентификацию
const { asyncWrapper } = require('../../helpers/apiHelpers'); // Мидлвар универсального обработчика try catch
const upload = require('../../helpers/upload'); // Обработчик загрузок

router.post('/signup', regController); // Роут для регистрации юзера
router.get('/verify/:verificationToken', asyncWrapper(verifyController)); // Верификация юзера
router.post('/verify/', reVerifyValidation, asyncWrapper(reVerifyController)); // Запрос повторной верификации юзера
router.post('/login', regLogValidation, asyncWrapper(loginController)); // Роут для входа юзера
router.post('/logout', protect, asyncWrapper(logoutController)); // Роут для выхода юзера
router.get('/current', protect, asyncWrapper(currentUserController)); // Роут для текущего юзера
router.patch(
	'/subscription',
	protect,
	subscriptionValidation,
	asyncWrapper(subscriptionController),
); // Роут для обновления статуса

router.patch(
	'/avatars',
	protect,
	upload.single('avatar'),
	asyncWrapper(avatarController),
); // Обновление аватара

module.exports = router;
