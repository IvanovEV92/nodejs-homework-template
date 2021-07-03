const {
	getContacts,
	getContactById,
	addContact,
	updateContact,
	updateContactStatus,
	removeContact,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
	const contacts = await getContacts(req.user.id, req.query);
	res.status(200).json({ contacts, status: 'success' });
};

const getContactsByIdController = async (req, res, next) => {
	const { contactId: id } = req.params;
	const contact = await getContactById(req.user.id, id);
	if (!contact) {
		return res.status(404).json({ message: 'Not found' });
	}
	res.status(200).json({ contact, status: 'success' });
};

const addContactsController = async (req, res, next) => {
	const contact = await addContact(req.user.id, req.body);
	res.status(201).json({ contact, status: 'success' });
};

const updateContactsController = async (req, res, next) => {
	const { contactId: id } = req.params;
	const { body } = req;
	const newContact = await updateContact(req.user.id, id, body);
	if (!newContact) {
		return res.status(404).json({ message: 'Not found' });
	}
	res.status(200).json({ newContact, status: 'success' });
};

const updateContactStatusController = async (req, res) => {
	const { contactId: id } = req.params;
	const {
		body: { favorite },
	} = req;
	const newContact = await updateContactStatus(req.user.id, id, favorite);
	if (!newContact) {
		return res.status(404).json({ message: 'Not found' });
	}
	res.status(200).json({ newContact, status: 'success' });
};

const removeContactsController = async (req, res, next) => {
	const { contactId: id } = req.params;
	const result = await removeContact(req.user.id, id);
	if (!result) {
		return res.status(404).json({ message: 'Not found' });
	}
	res.status(200).json({ message: 'contact deleted' });
};

module.exports = {
	getContactsController,
	getContactsByIdController,
	addContactsController,
	updateContactsController,
	updateContactStatusController,
	removeContactsController,
};
