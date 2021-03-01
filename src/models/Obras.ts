/* eslint-disable no-unused-vars */
import { Document, Schema, model } from 'mongoose'

interface ObrasInterface extends Document {
    titulo: string
    editora: string
    foto: string
    autores: string[]
}

const obrasSchema = new Schema({
  autores: {
    type: Array,
    required: false
  },
  titulo: {
    type: String,
    required: true
  },
  editora: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

export default model<ObrasInterface>('obras', obrasSchema)
