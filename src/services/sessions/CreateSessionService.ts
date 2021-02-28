import { uuid } from 'uuidv4'
import { ITelegramMessage } from '../../@types/ITelegramBot'
import api from '../../config/api'
// import cache from '../redis/Cache'

interface IMessage {
  msg: ITelegramMessage
}

class CreateSessionService {
  public static PHONE_NOT_EXISTS = 'Not exists phone'

  public async execute ({ msg }: IMessage): Promise<Object | string> {
    if (!msg.contact?.phone_number) {
      return {
        error: CreateSessionService.PHONE_NOT_EXISTS,
        msg: msg.text
      }
    }
    console.log('CTT', msg.contact?.phone_number)
    console.log('MSG', msg)
    return ''

    const payload = {
      name: msg.from.first_name,
      platform_type: 'telegram',
      contact_identifier: msg.contact.phone_number,
      messages: [
        {
          id: uuid(),
          content: msg.reply_to_messages.text,
          date: msg.reply_to_messages.date
        }
      ]
    }

    const response = await api.post('sessions', payload)
    if (response.status !== 201) {
      throw new Error('Failed send the session')
    }

    const { data: received } = response.data

    // cache.set(payload, response)
    return received
  }
}

export default CreateSessionService
