import { Router } from 'express';
import { addUser, loginUser, validateToken } from '../controllers/auth.js';
import { check } from 'express-validator';
import { strongPasswordConfig } from './expressValidator.js';
import { fieldValidator } from '../middlewares/field-validators.js';
import { jwtValidator } from '../middlewares/jwt-validator.js';

const router = Router();

// Authentication:
// host + /api/auth

router.post(
	'/register',
	[
		// middlewares
		check('name', 'The name is required').not().isEmpty(),
		check('email', 'The email is required').isEmail(),
		check(
			'password',
			'The password must be strong[+8 characters and upper case and lower case]'
		).isStrongPassword(strongPasswordConfig),
		fieldValidator,
	],
	addUser
);
router.post(
	'/',
	[
		check('email', 'The email is required').isEmail(),
		check(
			'password',
			'The password must be strong[+8 characters and upper case and lower case]'
		).isStrongPassword(strongPasswordConfig),
		fieldValidator,
	],
	loginUser
);
router.get('/validate', jwtValidator, validateToken);

export default router;
