import * as database from '../config/db'
import Bot from './commands/Bot'

class Main {
  constructor () {
    this.setConfig()
  }

  public async initialize (): Promise<void> {
    Bot.initialize()
  }

  private async setConfig (): Promise<void> {
    this.connectionDB()
  }

  private async connectionDB (): Promise<void> {
    try {
      await database.connect()
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  public async closedConnection (): Promise<void> {
    try {
      await database.close()
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

export default new Main()
