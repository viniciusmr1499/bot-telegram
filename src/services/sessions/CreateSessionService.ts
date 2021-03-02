import { uuid } from 'uuidv4'
import { ITelegramMessage } from '../../@types/ITelegramBot'
import api from '../../config/api'
import cache from '../redis/Cache'
// import Listen from '../redis/Listen'

interface IMessage {
  msg: ITelegramMessage
}

class CreateSessionService {
  public static PHONE_NOT_EXISTS = 'Not exists phone'
  public static MSG_RECEIVED = 'Message received'

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

    const payload = {
      chatId: msg.chat.id,
      name: msg.from.first_name,
      platform_type: 'telegram',
      contact_identifier: '85986117155',
      messages: [
        {
          id: uuid(),
          content: msg.text,
          date: new Date().toISOString()
        }
      ]
    }

    const response = await api.post('sessions', payload)
    if (response.status !== 201) {
      throw new Error('Failed send the session')
    }

    const { data: { _id: sessionId } } = response.data
    const id = `${sessionId}-${msg.chat.id}-${new Date().toISOString()}`
    console.log('sessionId', sessionId)

    const data = {
      id,
      phone: '85986117155',
      message: msg.text
    }
    // const sub = new Listen()
    // sub.subscribe(sessionId, '85986117155') // esse cliente é inscrito no canal/sessão
    cache.set(String(msg.chat.id), JSON.stringify(data))
    return CreateSessionService.MSG_RECEIVED
  }
}

export default CreateSessionService
