import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

export const User = model('User', UserSchema);