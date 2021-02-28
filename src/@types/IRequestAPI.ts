/* eslint-disable camelcase */
interface IMessages {
  id: string
  content: string
  date: Date
}

export interface IRequestAPI {
  name: string
  platform_type: string
  contact_identifier: string
  messages: IMessages[]
}
