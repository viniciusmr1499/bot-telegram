import { uuid } from 'uuidv4'
import { ITelegramMessage } from '../@types/ITelegramBot'
import api from '../config/api'

interface IMessage {
  msg: ITelegramMessage
}

class CreateSessionService {
  public async execute ({ msg }: IMessage): Promise<string> {
    const response = await api.post('sessions', {
      name: msg.from.first_name,
      platform_type: 'telegram',
      contact_identifier: '85996199709',
      messages: {
        id: uuid(),
        content: msg.text,
        date: msg.date
      }
    })

    if (response.status !== 201) {
      throw new Error('Failed send the session')
    }

    const { data: received } = response.data
    return received
  }
}

export default CreateSessionService
