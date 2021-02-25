/* eslint-disable camelcase */
interface ITelegramFromMessage {
  id: number
  is_bot: boolean
  first_name: string
}

interface ITelegramChat {
  id: number
  first_name: string
  type: string
}

export interface ITelegramMessage {
  message_id: number
  from: ITelegramFromMessage
  chat: ITelegramChat
  text: string
}

export interface ITelegramBot {
  token: string
  pooling: boolean
}
