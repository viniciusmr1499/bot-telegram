import { ITelegramMessage } from '../@types/ITelegramBot'
import auth from '../config/auth'

const TelegramBot = require('node-telegram-bot-api')

export default class Bot {
  private token: string = ''
  private bot: any

  constructor () {
    this.setConfig()
    this.setBot()
  }

  public async execute (): Promise<void> {
    this.bot.on('message', (msg: ITelegramMessage) => {
      const chatId = msg.chat.id
      const { text } = msg

      switch (text) {
        case '/start':
          break
        case '1':
          this.bot.sendMessage(chatId, 'Iniciando atendimento..')
          this.bot.sendMessage(chatId, 'Olá, me chamo Marcos Vincius!')
          this.bot.sendMessage(chatId, 'Em que posso ajudar?')
          this.bot.sendMessage(chatId, 'Pode contar comigo sempre!')
          break
        case '2':
          this.bot.sendMessage(chatId, 'Iniciando atendimento com suporte..')
          this.bot.sendMessage(chatId, 'Olá, me chamo Rafael Neri!')
          this.bot.sendMessage(chatId, 'Em que posso ser útil?')
          this.bot.sendMessage(chatId, 'Pode contar comigo sempre!')
          break
        case '3':
          this.bot.sendMessage(chatId, 'Atendimento encerrado!')
          break
        default:
          this.bot.sendMessage(chatId, 'Ops, não entendi, pode digitar novamente por favor?!')
      }
    })
  }

  private async setConfig (): Promise<void> {
    this.setToken(auth.token)
  }

  private setToken (token: string): void {
    this.token = token
  }

  private async setBot (): Promise<void> {
    this.bot = new TelegramBot(this.token, { polling: true })

    this.bot.onText(/\/start/, (msg: ITelegramMessage) => {
      const chatId = msg.chat.id

      this.bot.sendMessage(chatId, 'Olá, eu me chamo BOT_DEV :) seja muito bem-vindo!!')
      this.bot.sendMessage(chatId,
        'Digite:\n 1 - Iniciar atendimento\n 2 - Suporte\n 3 - encerrar atendimento\n'
      )
    })
  }
}
