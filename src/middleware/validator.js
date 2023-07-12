const Joi = require("joi");

module.exports = {
    UserValidation: function (req, res, next) {
        try {
            const User = Joi.object({
                email: Joi.string().email({ minDomainSegments: 2 }).required(),
                mobile: Joi.string().required(),
                password: Joi.string().required(),
                status: Joi.string()
            });

            User.validate(req.body);
            return next();
        } catch (err) {
            return res.status(400).json({ msg: err.message, data: err });
        }
    }
};