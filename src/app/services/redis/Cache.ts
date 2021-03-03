import * as Redis from 'ioredis'

class Cache {
  private redis: any;

  constructor () {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      keyPrefix: 'cache'
    })
  }

  public async get (key: string): Promise<Object | null> {
    const value = await this.redis.get(key)
    return value ? JSON.parse(value) : null
  }

  public set (key: string, value: Object, timeExp: number = 60 * 15): void {
    this.redis.set(key, JSON.stringify(value), 'EX', timeExp)
  }

  public del (key: string) {
    return this.redis.del(key)
  }

  public async delPrefix (prefix: string) {
    const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key: string) => key.replace('cache', ''))

    return this.redis.del(keys)
  }
}

export default new Cache()
