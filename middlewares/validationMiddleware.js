const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
	addPostValidation: (req, res, next) => {
		const schema = Joi.object({
			name: Joi.string().min(2).max(30).required(),
			email: Joi.string().email({ minDomainSegments: 2 }).required(),
			phone: Joi.string()
				.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
				.required(),
			favorite: Joi.boolean().optional(),
		});

		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}

		next();
	},

	patchPostValidation: (req, res, next) => {
		const schema = Joi.object({
			name: Joi.string().alphanum().min(2).max(30).optional(),
			email: Joi.string().email({ minDomainSegments: 2 }).optional(),
			phone: Joi.string()
				.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
				.optional(),
			favorite: Joi.boolean().optional(),
		});

		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}

		next();
	},
	schemaUpdateContactStatus: (req, res, next) => {
		const schema = Joi.object({
			favorite: Joi.boolean().optional(),
		});

		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}

		next();
	},
	schemaId: (req, res, next) => {
		const schema = Joi.object({
			contactId: Joi.objectId(),
		});

		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}

		next();
	},
};
