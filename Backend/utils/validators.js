const { body } = require('express-validator');

exports.registerValidator = [
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password minimum 6 chars')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Provide a valid email'),
  body('password').exists().withMessage('Password required')
];
