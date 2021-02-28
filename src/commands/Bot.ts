import { ITelegramMessage } from '../@types/ITelegramBot'
import auth from '../config/auth'
import ClosedSessionService from '../services/ClosedSessionService'
import CreateSessionService from '../services/CreateSessionService'
import * as TelegramBot from 'node-telegram-bot-api'
// import { InlineKeyboard } from 'node-telegram-keyboard-wrapper'

export default class Bot {
  private token: string = ''
  private bot: any

  constructor () {
    this.setConfig()
  }

  public async main (): Promise<void> {
    this.bot.on('message', (msg: ITelegramMessage) => {
      const chatId = msg.chat.id
      const { text } = msg

      if (text === '/start') {
        // TODO só cria sessão senao existir
        console.log(msg)
      }

      console.log(msg)

      try {
        this.startSession(chatId, msg)
      } catch (e) {
        console.log(e.message)
      }
    })
  }

  protected async startSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const sessionService = new CreateSessionService()

    const received = await sessionService.execute({ msg })
    this.bot.sendMessage(chatId, received, {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          [
            {
              text: 'compartilhar meu contato.',
              request_contact: true
            }
          ]
        ],
        one_time_keyboard: true
      }
    })

    // const ik = new InlineKeyboard()

    // ik.addRow(
    //   { text: '2:1 button', callback_data: 'Works!' },
    //   { text: '2:2 button', callback_data: 'Works!' }
    // )
    // this.bot.sendMessage(chatId, received, ik.build())
  }

  protected async closedSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const closedService = new ClosedSessionService()

    const received = await closedService.execute({ msg })
    this.bot.sendMessage(chatId, received)
  }

  private async setConfig (): Promise<void> {
    this.setToken(auth.token)
    this.bot = new TelegramBot(this.token, { polling: true })
  }

  private setToken (token: string): void {
    this.token = token
  }
}
