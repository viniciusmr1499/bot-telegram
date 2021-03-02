import 'dotenv/config'
import * as TelegramBot from 'node-telegram-bot-api'
import * as Redis from 'ioredis'

const redis = new Redis()
const bot = new TelegramBot(String(process.env.BOT_TOKEN), { polling: true })

const subscribe = (chatId: number, userId: any) => {
  redis.subscribe(String(chatId), () => {
    console.log(`subscribed on channel ${chatId}`)
  })

  redis.on('message', (channel, data) => {
    const newData = JSON.parse(data)
    console.log(newData)
    if (newData.userId !== userId) {
      bot.sendMessage(channel, newData.message)
    }
  })
}

subscribe(974302180, 'Rafael')
