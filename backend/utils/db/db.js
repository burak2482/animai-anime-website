import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const dbConnect = async () => {
  if(mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB connected')
  } catch (err) {
    console.log('MongoDB connection error:', err)
    process.exit(1);
  }

}

export default dbConnect;