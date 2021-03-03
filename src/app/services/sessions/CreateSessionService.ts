/* eslint-disable camelcase */
import { uuid } from 'uuidv4'
import { ITelegramMessage } from '../../../@types/ITelegramBot'
import api from '../../../config/api'

class CreateSessionService {
  public async execute (msg: ITelegramMessage | any): Promise<boolean> {
    if (msg.text) {
      return false
    }

    const { phone_number } = msg.contact
    const char = phone_number.charAt(0)
    const payload = {
      chatId: msg.chat.id,
      name: msg.from.first_name,
      platform_type: 'telegram',
      contact_identifier: char === '+' ? phone_number.slice(1, -1) : phone_number,
      messages: [
        {
          id: uuid(),
          content: msg.reply_to_message.text,
          date: new Date().toISOString()
        }
      ]
    }

    const response = await api.post('sessions', payload)
    if (response.status !== 201) {
      throw new Error('Failed send the session')
    }

    return true
  }
}

export default CreateSessionService
