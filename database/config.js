import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Successful database connection');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to connect to database')
  }
}