const express = require('express');
const router = express.Router();
const {
	getContactsController,
	getContactsByIdController,
	addContactsController,
	updateContactsController,
	updateContactStatusController,
	removeContactsController,
} = require('../../controllers/contactsController');

const {
	addPostValidation,
	patchPostValidation,
	schemaUpdateContactStatus,
} = require('../../middlewares/validationMiddleware');

const { asyncWrapper } = require('../../helpers/apiHelpers');
const { protect } = require('../../middlewares/authProtect'); // Мидлвар на аутентификацию

router.use(protect); // Мидлвар защиты роутов

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactsByIdController));
router.post('/', addPostValidation, asyncWrapper(addContactsController));
router.patch(
	'/:contactId',
	patchPostValidation,
	asyncWrapper(updateContactsController),
);
router.patch(
	'/:contactId/favorite',
	schemaUpdateContactStatus,
	asyncWrapper(updateContactStatusController),
);
router.delete('/:contactId', asyncWrapper(removeContactsController));

module.exports = router;
