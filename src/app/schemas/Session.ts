import * as mongoose from 'mongoose'
import { Document, Schema } from 'mongoose'

type Session = Document & {}

const SessionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    platform_type: {
      type: String,
      required: true
    },
    contact_identifier: {
      type: String,
      required: true
    },
    messages: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: false
  }
)

export default mongoose.model<Session>('Session', SessionSchema)
