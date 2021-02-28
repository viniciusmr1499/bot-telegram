import { ITelegramMessage } from '../@types/ITelegramBot'
import auth from '../config/auth'
import ClosedSessionService from '../services/sessions/ClosedSessionService'
import CreateSessionService from '../services/sessions/CreateSessionService'
import * as TelegramBot from 'node-telegram-bot-api'

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

      if (text !== '/start') {
        try {
          this.startSession(chatId, msg)
        } catch (e) {
          console.log(e.message)
        }
      }
    })
  }

  protected async startSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const sessionService = new CreateSessionService()
    const received = await sessionService.execute({ msg })

    this.bot.sendMessage(chatId, received)
  }

  // protected async startSession (chatId: number, msg: ITelegramMessage): Promise<boolean> {
  //   const sessionService = new CreateSessionService()
  //   const received = await sessionService.execute({ msg })

  //   if (received.error === CreateSessionService.PHONE_NOT_EXISTS) {
  //     this.sendMessage(chatId, 'MENSAGEM RECEBIDA')
  //     return false
  //   }

  //   this.sendMessage(chatId, received.msg)
  //   return true
  // }

  protected async closedSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const closedService = new ClosedSessionService()

    const received = await closedService.execute({ msg })
    this.bot.sendMessage(chatId, received)
  }

  protected sendMessage (chatId: number, msg: ITelegramMessage):void {
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
  }

  private async setConfig (): Promise<void> {
    this.setToken(auth.token)
    this.bot = new TelegramBot(this.token, { polling: true })
  }

  private setToken (token: string): void {
    this.token = token
  }
}
