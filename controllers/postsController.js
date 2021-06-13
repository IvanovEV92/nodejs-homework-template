const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
} = require('../model/');

const getContacts = async (req, res, next) => {
	try {
		const allContacts = await listContacts();

		res.status(200).json({ allContacts, status: 'success' });
	} catch (error) {
		next(error);
	}
};

const getContactsById = async (req, res, next) => {
	const { contactId: id } = req.params;

	try {
		const contact = await getContactById(id);
		if (!contact) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json({ contact, status: 'success' });
	} catch (error) {
		next(error);
	}
};

const addContacts = async (req, res, next) => {
	const { body } = req;
	try {
		const allContacts = await addContact(body);

		res.status(200).json({ allContacts, status: 'success' });
	} catch (error) {
		next(error);
	}
};

const removeContacts = async (req, res, next) => {
	const { contactId: id } = req.params;

	try {
		const contacts = await removeContact(id);
		if (!contacts) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json({ contacts, status: 'success' });
	} catch (error) {
		next(error);
	}
};

const updateContacts = async (req, res, next) => {
	try {
		const { contactId: id } = req.params;
		const { body } = req;

		if (Object.keys(body).length === 0) {
			return res.status(404).json({ message: 'Not found' });
		} else {
			const contact = await updateContact(id, body);

			res.status(200).json({ contact, status: 'success' });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getContacts,
	getContactsById,
	removeContacts,
	addContacts,
	updateContacts,
};
