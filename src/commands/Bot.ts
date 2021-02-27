import { ITelegramMessage } from '../@types/ITelegramBot'
import auth from '../config/auth'
import ClosedSessionService from '../services/ClosedSessionService'
import CreateSessionService from '../services/CreateSessionService'

const TelegramBot = require('node-telegram-bot-api')

export default class Bot {
  private token: string = ''
  private bot: any

  constructor () {
    this.setConfig()
  }

  public async execute (): Promise<void> {
    this.bot.on('message', (msg: ITelegramMessage) => {
      const chatId = msg.chat.id
      const { text } = msg

      switch (text) {
        case '/start':
          try {
            this.startSession(chatId, msg)
          } catch (e) {
            console.log(e.message)
          }
          break
        case '1':

          // this.bot.sendMessage(chatId, 'Iniciando atendimento..')
          // this.bot.sendMessage(chatId, 'Olá, me chamo Marcos Vincius!')
          // this.bot.sendMessage(chatId, 'Em que posso ajudar?')
          // this.bot.sendMessage(chatId, 'Pode contar comigo sempre!')
          break
        case '2':
          this.bot.sendMessage(chatId, 'Iniciando atendimento com suporte..')
          this.bot.sendMessage(chatId, 'Olá, me chamo Rafael Neri!')
          this.bot.sendMessage(chatId, 'Em que posso ser útil?')
          this.bot.sendMessage(chatId, 'Pode contar comigo sempre!')
          break
        case '3':
          try {
            this.closedSession(chatId, msg)
          } catch (e) {
            console.log(e.message)
          }
          break
        default:
          this.bot.sendMessage(chatId, 'Ops, não entendi, pode digitar novamente por favor?!')
      }
    })
  }

  public async startSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const sessionService = new CreateSessionService()

    const received = await sessionService.execute({ msg })
    this.bot.sendMessage(chatId, received)
  }

  public async closedSession (chatId: number, msg: ITelegramMessage): Promise<void> {
    const closedService = new ClosedSessionService()

    const received = await closedService.execute({ msg })
    this.bot.sendMessage(chatId, received)
  }

  private async setConfig (): Promise<void> {
    this.setToken(auth.token)
    this.bot = new TelegramBot(this.token, { polling: true })
    // this.setBot()
  }

  private setToken (token: string): void {
    this.token = token
  }

  /* private async setBot (): Promise<void> {
    this.bot = new TelegramBot(this.token, { polling: true })

    this.bot.onText(/\/start/, (msg: ITelegramMessage) => {
      const chatId = msg.chat.id

      this.bot.sendMessage(chatId, 'Olá, eu me chamo BOT_DEV :) seja muito bem-vindo!!')
      this.bot.sendMessage(chatId,
        'Digite:\n 1 - Iniciar atendimento\n 2 - Suporte\n 3 - encerrar atendimento\n'
      )

      try {
        this.startSession(chatId, msg)
      } catch (e) {
        console.log(e.message)
      }
    })
  } */
}
