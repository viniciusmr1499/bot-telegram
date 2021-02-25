import { Command } from '@oclif/command'

class BotTelegram extends Command {
  static description = 'describe the command here'

  async run () {
    this.log('hello world')
  }
}

export = BotTelegram
