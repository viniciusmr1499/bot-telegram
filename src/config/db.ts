import * as mongoose from 'mongoose'

export const connect = async (): Promise<any> => {
  await mongoose.connect(`mongodb://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASS}@${process.env.DB_MONGO_HOST}:${process.env.DB_MONGO_PORT}/${process.env.DB_MONGO_NAME}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAlive: true
  })

  console.info('Successful connection: [mongoDb]')
}

export const close = ():Promise<void> => mongoose.connection.close()
