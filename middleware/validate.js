const { body, validationResult } = require('express-validator');

const contactRules = () => {
    return [
        body('firstName').notEmpty().isString().withMessage('First name must be a string'),
        body('lastName').notEmpty().isString().withMessage('Last name must be a string'),
        body('email').isEmail().withMessage('Please provide a valid email address'),
        body('favoriteColor').isString().withMessage('Favorite color must be a string'),
        body('birthday').isString().withMessage('Birthday must be a string'),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    contactRules,
    validate
};