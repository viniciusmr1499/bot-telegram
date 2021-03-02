import { ITelegramMessage } from '../@types/ITelegramBot'
import auth from '../config/auth'
import CreateSessionService from '../services/sessions/CreateSessionService'
import * as TelegramBot from 'node-telegram-bot-api'
import cache from '../services/redis/Cache'

class Bot {
  private token: string = ''
  private bot: any

  constructor () {
    this.setConfig()
  }

  public async main (): Promise<void> {
    this.bot.on('message', async (msg: ITelegramMessage) => {
      const chatId = msg.chat.id
      const { text } = msg
      const cached = await cache.get(String(chatId))

      if (text !== '/start') {
        try {
          if (!cached) {
            console.log('entra au')
            this.startSession(chatId, msg)
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    })
  }

  private async startSession (chatId: string | number, msg: ITelegramMessage): Promise<void> {
    const sessionService = new CreateSessionService()
    const received = await sessionService.execute({ msg })
    this.bot.sendMessage(chatId, received)
  }

  public chat (chatId: string | number, msg: string): void {
    this.bot.sendMessage(chatId, msg)
  }

  // private sendMessage (chatId: number, msg: ITelegramMessage):void {
  //   this.bot.sendMessage(chatId, msg, {
  //     parse_mode: 'HTML',
  //     reply_markup: {
  //       keyboard: [
  //         [
  //           {
  //             text: 'Compartilhar meu contato.',
  //             request_contact: true
  //           }
  //         ]
  //       ],
  //       resize_keyboard: true,
  //       one_time_keyboard: true
  //     }
  //   })
  // }

  private async setConfig (): Promise<void> {
    this.setToken(auth.token)
    this.bot = new TelegramBot(this.token, { polling: true })
  }

  private setToken (token: string): void {
    this.token = token
  }
}

export default new Bot()
