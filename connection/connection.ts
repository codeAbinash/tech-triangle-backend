import mongoose from 'mongoose'
import { createClient } from 'redis'

export async function connectMongo() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('Mongo ✅')
      return mongoose.connection
    }
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.once('open', () => {
      console.log('MongoDB database connection established successfully')
    })

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
      process.exit()
    })

    return connection
  } catch (e) {
    console.log('Could not connect to MongoDB')
    console.log(e)
  }
}

export const redClientRedis = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
})

export const redClientUpstash = createClient({
  url: process.env.UPSTASH_URI,
})

export const redClient = process.env.NODE_ENV === 'production' ? redClientUpstash : redClientRedis

export async function connectRedis() {
  if (redClient.isOpen) {
    console.log('Redis ✅')
    return
  }
  redClient.on('error', function (err) {
    throw err
  })
  await redClient.connect()
  console.log('Redis connection established successfully')
}
