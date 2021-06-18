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
	schemaId,
	schemaUpdateContactStatus,
} = require('../../middlewares/validationMiddleware');

const { asyncWrapper } = require('../../helpers/apiHelpers');

router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', schemaId, asyncWrapper(getContactsByIdController));
router.post('/', addPostValidation, asyncWrapper(addContactsController));
router.patch(
	'/:contactId',
	schemaId,
	patchPostValidation,
	schemaUpdateContactStatus,
	asyncWrapper(updateContactsController),
);
router.patch(
	'/:contactId/favorite',
	schemaId,
	asyncWrapper(updateContactStatusController),
);
router.delete('/:contactId', schemaId, asyncWrapper(removeContactsController));

module.exports = router;
