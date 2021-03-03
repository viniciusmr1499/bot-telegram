/* eslint-disable array-callback-return */

import { uuid } from 'uuidv4'
import { ITelegramMessage } from '../../../@types/ITelegramBot'
import cache from '../redis/Cache'
import Session from '../../schemas/Session'

class PersisteMessageService {
  public async execute (msg: ITelegramMessage | any): Promise<boolean | undefined> {
    const cached: string | any = await cache.get(String(msg.chat.id))
    const char = cached.phone.charAt(0)
    const session = await Session.find({ _id: cached.sessionId })

    if (!(session.length > 0)) {
      return false
    }

    const body = {
      id: uuid(),
      content: msg.text,
      date: new Date().toISOString()
    }

    const currentMessages: Array<Object> | any = []
    session.map((items: any) => {
      items.messages.map((item: Object | any) => {
        currentMessages.push(item)
      })
    })

    const payload = {
      chatId: msg.chat.id,
      name: msg.from.first_name,
      platform_type: 'telegram',
      contact_identifier: char === '+' ? cached.phone.slice(1, -1) : cached.phone, // removed prefix '+'
      messages: [...currentMessages, body]
    }

    const response = await Session.findByIdAndUpdate(cached.sessionId, payload)
    if (!response) {
      throw new Error('Failed update on mongo')
    }

    return true
  }
}

export default PersisteMessageService
