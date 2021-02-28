import * as Redis from 'ioredis'

class Cache {
  protected redis

  constructor () {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      keyPrefix: 'cache'
    })
  }

  public async get (key: any): Promise<Object | null> {
    const value = await this.redis.get(key)
    return value ? JSON.parse(value) : null
  }

  public set (key: any, value: Object, timeExp: number = 60 * 15): void {
    this.redis.set(key, JSON.stringify(value), 'EX', timeExp)
  }

  public del (key: any) {
    return this.redis.del(key)
  }

  public async delPrefix (prefix: string) {
    const keys = (await this.redis.keys(`cache:${prefix}:*`)).map(key => key.replace('cache', ''))

    return this.redis.del(keys)
  }
}

export default new Cache()
