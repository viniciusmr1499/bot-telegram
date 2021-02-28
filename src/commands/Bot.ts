import { ITelegramMessage } from '../@types/ITelegramBot'
import auth from '../config/auth'
import ClosedSessionService from '../services/sessions/ClosedSessionService'
import CreateSessionService from '../services/sessions/CreateSessionService'
import cache from '../services/redis/Cache'
import * as TelegramBot from 'node-telegram-bot-api'
// import { InlineKeyboard } from 'node-telegram-keyboard-wrapper'

export default class Bot {
  private token: string = ''
  private bot: any

  constructor () {
    this.setConfig()
  }

  public async main (): Promise<void> {
    this.bot.on('message', async (msg: ITelegramMessage) => {
      const chatId = msg.chat.id
      const { text } = msg

      // const cached = await cache.get(msg)
      // console.log(cached)

      // if (cached) {
      //   return cached
      // }
      // if (text !== '/start') {
      //   try {
      //     this.startSession(chatId, msg)
      //   } catch (e) {
      //     console.log(e.message)
      //   }
      // }

      try {
        this.startSession(chatId, msg)
      } catch (e) {
        console.log(e.message)
        // this.startSession(chatId, )
      }
    })
  }

  protected async startSession (chatId: number, msg: ITelegramMessage): Promise<boolean> {
    const sessionService = new CreateSessionService()
    const received = await sessionService.execute({ msg })

    if (received.error === CreateSessionService.PHONE_NOT_EXISTS) {
      this.sendMessage(chatId, 'MENSAGEM RECEBIDA')
      console.log('ENTROU AQUIIIIIIIIIII')
      return false
    }

    console.log('NÃO É PARA ENTRAR AQUI')
    this.sendMessage(chatId, received.msg)
    return true
  }

  protected async closedSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const closedService = new ClosedSessionService()

    const received = await closedService.execute({ msg })
    this.bot.sendMessage(chatId, received)
  }

  protected sendMessage (chatId: number, msg: ITelegramMessage | any):void {
    this.bot.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          [
            {
              text: 'Compartilhar meu contato.',
              request_contact: true
            }
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    })

    // console.log('CAIU AQUIIIIIIIIIIIII', t)
    // this.bot.sendMessage(chatId, msg)
  }

  private async setConfig (): Promise<void> {
    this.setToken(auth.token)
    this.bot = new TelegramBot(this.token, { polling: true })
  }

  private setToken (token: string): void {
    this.token = token
  }
}
