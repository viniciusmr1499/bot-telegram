import * as Redis from 'ioredis'
const redis = new Redis()
const pub = Redis()

const publish = (chatId: number, userId: any, message: any) => {
  redis.subscribe(String(chatId), () => {
    const data = {
      userId,
      message
    }

    pub.publish(String(chatId), JSON.stringify(data))
  })
}

publish(974302180, 'vinicius', 'Olá, Neri!')
