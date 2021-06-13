const express = require('express');
const router = express.Router();
const {
	getContacts,
	getContactsById,
	addContacts,
	removeContacts,
	updateContacts,
} = require('../../controllers/postsController');

const {
	addPostValidation,
	patchPostValidation,
} = require('../../middlewares/validationMiddleware');

router.get('/', getContacts);
router.get('/:contactId', getContactsById);
router.post('/', addContacts);
router.patch('/:contactId', patchPostValidation, updateContacts);
router.delete('/:contactId', removeContacts);

module.exports = router;
