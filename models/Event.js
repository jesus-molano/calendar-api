import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const EventSchema = Schema({
	title: { type: String, required: true },
	notes: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true} // User model reference
});

EventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

export const Event = model('Event', EventSchema);