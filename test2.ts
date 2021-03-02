import Bot from './src/commands/Bot'

require('dotenv/config')
const Redis = require('ioredis')
const redis = new Redis()
const pub = new Redis()

redis.subscribe('603e4fea8411da3f5a0b9a62', () => {
  pub.publish('603e4fea8411da3f5a0b9a62', 'Hello world!')
})

redis.on('message', (channel: any, message: any) => {
  console.log('Receive message %s from channel %s', message, channel)
  Bot.chat('974302180', message)
})
