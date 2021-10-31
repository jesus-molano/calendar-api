import bcrypt from 'bcryptjs'
import { User } from '../models/User.js';
import { generateJWT } from '../helpers/jwt.js';

export const addUser = async (req, res) => {
	const { email, password } = req.body
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'There is already a user with this email'
			})
		}
		user = new User(req.body);
		//Encrypt password
		const salt = bcrypt.genSaltSync(); // default 10 rounds
		user.password = bcrypt.hashSync(password, salt);
		await user.save();

		// Generate the JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'An error occurred in the registry'
		})
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({email})
		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Username does not exist'
			})
		}

		// Passwords confirm
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Incorrect password'
			})
		}

		// Generate the JWT
		const token = await generateJWT(user.id, user.name);
		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		})
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'An error occurred in login'
		})
	}
};

export const validateToken = async(req, res) => {
	const {uid, name } = req;

	// Generate JWT
	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		uid,
		name,
		token
	});
};
