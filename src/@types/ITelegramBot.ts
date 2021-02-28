/* eslint-disable camelcase */
interface ITelegramFromMessage {
  first_name: string
}

interface ITelegramChat {
  id: number
  first_name: string
  type: string
}

// interface IReplyToMessages {
//   from: ITelegramFromMessage
//   chat: ITelegramChat
//   date: Date
//   text: string
// }

// interface IContact {
//   phone_number: string
// }

export interface ITelegramMessage {
  message_id: number
  from: ITelegramFromMessage
  chat: ITelegramChat
  // reply_to_messages: IReplyToMessages
  // contact?: IContact
  text: string
  date: Date
}

export interface ITelegramBot {
  token: string
  pooling: boolean
}
