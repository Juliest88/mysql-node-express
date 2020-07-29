const { body, check } = require('express-validator');


exports.createUserSchema = [
    check('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('first_name')
        .exists()
        .withMessage('Your first name is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('last_name')
        .exists()
        .withMessage('Your last name is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters'),
    check('password_confirmation')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('password_confirmation field must have the same value as the password field'),
    check('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number')
];

exports.updateUserSchema = [
    check('username')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('first_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('last_name')
        .optional()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    check('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('password')
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .isLength({ max: 10 })
        .withMessage('Password can contain max 10 characters')
        .custom((value, { req }) => req.body.password_confirmation === req.body.password)
        .withMessage('password_confirmation field must have the same value as the password field'),
    check('age')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body()
        .custom(value => {
            // remove it because we won't use it in the query level
            delete value['password_confirmation'];
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'password', 'email', 'first_name', 'last_name', 'age'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    check('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];