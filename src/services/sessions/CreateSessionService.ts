import { uuid } from 'uuidv4'
import { ITelegramMessage } from '../../@types/ITelegramBot'
import api from '../../config/api'
import cache from '../redis/Cache'

interface IMessage {
  msg: ITelegramMessage
}

class CreateSessionService {
  public static PHONE_NOT_EXISTS = 'Not exists phone'
  public static MSG_RECEIVED = 'Mensagem recebida'

  public async execute ({ msg }: IMessage): Promise<string> {
    /**
     * TODO pegar o telefone direto da plataforma do telegram
     */
    // if (!msg.contact?.phone_number) {
    //   return {
    //     error: CreateSessionService.PHONE_NOT_EXISTS,
    //     msg: msg.text
    //   }
    // }
    const cached = await cache.get(String(msg.chat.id))
    if (cached) {
      /**
       * TODO fazer update na collection sessions incrementando as mensagens
       * Enviar data no formato correto
       */
      return CreateSessionService.MSG_RECEIVED
    }

    const payload = {
      name: msg.from.first_name,
      platform_type: 'telegram',
      contact_identifier: '85996199709',
      messages: [
        {
          id: uuid(),
          content: msg.text,
          date: msg.date
        }
      ]
    }

    const response = await api.post('sessions', payload)
    if (response.status !== 201) {
      throw new Error('Failed send the session')
    }

    const { data: received } = response.data

    cache.set(String(msg.chat.id), JSON.stringify(payload))
    return received
  }
}

export default CreateSessionService
