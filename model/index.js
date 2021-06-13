const fs = require('fs/promises');
const path = require('path');
const contacts = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
	try {
		const data = await fs.readFile(contacts, 'utf8');

		return JSON.parse(data);
	} catch (error) {
		console.error(error.message);
	}
};

const getContactById = async contactId => {
	try {
		const data = await fs.readFile(contacts, 'utf8');
		const parsContacts = JSON.parse(data);

		const contact = parsContacts.filter(
			contact => Number(contact.id) === Number(contactId),
		);

		return contact;
	} catch (error) {
		console.error(error.message);
	}
};

const addContact = async body => {
	const { name, email, phone } = body;

	const newContact = {
		id: new Date().getTime().toString(),
		name,
		email,
		phone,
	};

	try {
		const data = await fs.readFile(contacts, 'utf8');
		const parsContacts = JSON.parse(data);

		const newContacts = [...parsContacts, newContact];

		await fs.writeFile(contacts, JSON.stringify(newContacts, null, 2));

		return newContacts;
	} catch (error) {
		console.error(error.message);
	}
};

const removeContact = async contactId => {
	try {
		const data = await fs.readFile(contacts, 'utf8');
		const parsContacts = JSON.parse(data);
		const newContacts = parsContacts.filter(
			contact => Number(contact.id) !== Number(contactId),
		);

		await fs.writeFile(contacts, JSON.stringify(newContacts, null, 2));

		return newContacts;
	} catch (error) {
		console.error(error.message);
	}
};

const updateContact = async (contactId, body) => {
	try {
		const data = await fs.readFile(contacts, 'utf8');
		const parsContacts = JSON.parse(data);

		const result = parsContacts.map(contact => {
			if (Number(contact.id) === Number(contactId)) {
				const newContact = {
					...contact,
					...body,
				};
				return newContact;
			} else return contact;
		});

		await fs.writeFile(contacts, JSON.stringify(result, null, 2));

		return result;
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
