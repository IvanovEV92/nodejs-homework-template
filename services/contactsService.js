const Contacts = require('../schemas/contactModel');

const getContacts = async () => {
	const contacts = await Contacts.find();
	return contacts;
};

const getContactById = async contactId => {
	const contact = await Contacts.findById(contactId);
	return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
	const contact = await Contacts.create({ name, email, phone, favorite });
	return contact;
};

const updateContact = async (contactId, body) => {
	const updatedContact = await Contacts.findByIdAndUpdate(contactId, body, {
		new: true,
	});
	return updatedContact;
};

const updateContactStatus = async (contactId, favorite) => {
	const updatedStatusContact = await Contacts.findByIdAndUpdate(
		contactId,
		{ favorite },
		{ new: true },
	);
	return updatedStatusContact;
};

const removeContact = async contactId => {
	const contact = await Contacts.findByIdAndRemove(contactId);
	return contact;
};
module.exports = {
	getContacts,
	getContactById,
	addContact,
	updateContact,
	updateContactStatus,
	removeContact,
};
