import auth from '../../config/auth'
import CreateSessionService from '../services/sessions/CreateSessionService'
import PersisteMessageService from '../services/sessions/PersisteMessageService'
import * as TelegramBot from 'node-telegram-bot-api'
import cache from '../services/redis/Cache'

const sessionService = new CreateSessionService()
const persisteMessageService = new PersisteMessageService()
class Bot {
  private token: string = ''
  private bot: any
  private cached: any = null

  constructor () {
    this.setConfig()
  }

  /** FAZ A INICIALIZAÇÃO DE TODO O PROCESSO */
  public async initialize (): Promise<void> {
    this.bot.on('message', async (msg: any) => {
      try {
        const chatId = msg.chat.id
        const text = msg.text
        this.cached = await cache.get(String(chatId))

        if (text !== '/start') {
          if (!this.cached) {
            this.startSession(chatId, msg)
          } else {
            this.chat(chatId, msg)
          }
        }
      } catch (e) {
        console.error('ERROR', e.message)
      }
    })
  }

  /** FAZ A CRIAÇÃO DA SESSÃO NA BASE DE DADOS */
  private async startSession (chatId: string | number, msg: any): Promise<void> {
    const isOk = await sessionService.execute(msg)
    if (isOk) {
      this.cached = await cache.get(String(chatId))
    }

    if (!this.cached && !isOk) {
      this.sendMessage(chatId, 'Message received. Please confirm your contact so we can continue :)')
    }
  }

  /** FAZ ATUALIZAÇÃO DAS MENSAGENS NA SESSÃO */
  private async chat (chatId: string | number, msg: any): Promise<void> {
    if (this.cached) {
      const isOk = await persisteMessageService.execute(msg)
      if (isOk) {
        this.bot.sendMessage(chatId, msg.text)
      }
    }
  }

  /** FAZ O ENVIO DA MENSAGEM PARA O CLIENTE NO TELEGRAMA */
  private sendMessage (chatId: number | string, msg: string):void {
    this.bot.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      is_anonymous: false,
      reply_markup: {
        keyboard: [
          [
            {
              text: 'Share my contact',
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

export default new Bot()
