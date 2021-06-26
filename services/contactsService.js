const Contacts = require('../schemas/contactModel');

const getContacts = async (userId, query) => {
	const { page = 1, limit = 20, sortBy, sortByDesc, favorite = null } = query;

	const search = { owner: userId };

	if (favorite !== null) {
		search.favorite = favorite;
	}

	const result = await Contacts.paginate(search, {
		page,
		limit,
		sort: {
			...(sortBy ? { [`${sortBy}`]: 1 } : {}),
			...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
		},
	});

	const { docs: contacts, totalDocs: total, totalPages } = result;

	return {
		contacts,
		total,
		totalPages,
		page: Number(page),
		limit: Number(limit),
	};
};

const getContactById = async (userId, contactId) => {
	const contact = await Contacts.findById({
		_id: contactId,
		owner: userId,
	}).select({ __v: 0 });
	return contact;
};

const addContact = async (userId, body) => {
	const contact = await Contacts.create({ ...body, owner: userId });
	return contact;
};

const updateContact = async (userId, contactId, body) => {
	const updatedContact = await Contacts.findByIdAndUpdate(
		{
			_id: contactId,
			owner: userId,
		},
		body,
		{
			new: true,
		},
	).select({ __v: 0 });
	return updatedContact;
};

const updateContactStatus = async (userId, contactId, favorite) => {
	const updatedStatusContact = await Contacts.findByIdAndUpdate(
		{
			_id: contactId,
			owner: userId,
		},
		{ favorite },
		{ new: true },
	).select({ __v: 0 });
	return updatedStatusContact;
};

const removeContact = async (userId, contactId) => {
	const contact = await Contacts.findByIdAndRemove({
		_id: contactId,
		owner: userId,
	}).select({
		__v: 0,
	});
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
