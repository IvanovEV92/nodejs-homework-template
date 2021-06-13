const Joi = require('joi');

module.exports = {
	addPostValidation: (req, res, next) => {
		const schema = Joi.object({
			name: Joi.string().alphanum().min(2).max(30).required(),
			email: Joi.string().email({ minDomainSegments: 2 }).required(),
			phone: Joi.string()
				.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
				.required(),
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
		});

		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return res.status(400).json({ status: validationResult.error.details });
		}

		next();
	},
};
