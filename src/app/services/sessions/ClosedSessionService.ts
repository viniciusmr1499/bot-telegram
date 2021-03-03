import { ITelegramMessage } from '../../../@types/ITelegramBot'
import api from '../../../config/api'

interface IMessage {
  msg: ITelegramMessage
}

class CreateSessionService {
  public async execute ({ msg }: IMessage): Promise<string> {
    const response = await api.get(`sessions/me?name=${msg.from.first_name}`)

    if (response.status !== 200) {
      throw new Error('It is not possible to close a non-existent session')
    }

    const sessionID = response.data.data[0]._id
    const sessionResponse = await api.delete(`sessions/${sessionID}`)
    if (sessionResponse.status !== 200) {
      throw new Error('Failed the closed session')
    }

    const { message } = sessionResponse.data.data
    return message
  }
}

export default CreateSessionService
