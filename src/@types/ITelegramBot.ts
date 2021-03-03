/* eslint-disable camelcase */
interface IFromDTO {
  id: number
  is_bot: boolean
  first_name: string
  language_code: string
}

interface IChatDTO {
  id: number
  first_name: string
  type: string
}

interface IFromReplyToMessagesDTO {
  id: number
  is_bot: boolean
  first_name: string
  language_code: string
  username: string
}

interface IReplyToMessagesDTO {
  message_id: number
  from: IFromReplyToMessagesDTO
  chat: IChatDTO
  date: number
  text: string
}

interface IContactDTO {
  phone_number: string
  first_name: string
  user_id: number
}

export interface ITelegramMessage {
  message_id: number
  from: IFromDTO
  chat: IChatDTO
  date: number
  reply_to_message: IReplyToMessagesDTO
  contact: IContactDTO
}

export interface ITelegramBot {
  token: string
  pooling: boolean
}
