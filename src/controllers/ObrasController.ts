/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
import { Request, Response } from 'express'

import mongoose from 'mongoose'

import Obras from '@models/Obras'

class ObrasController {
  public async create (req: Request, res: Response): Promise<Response> {
    const data = req.body

    try {
      const work = await Obras.create(data)

      const newWork = {
        id: work._id,
        titulo: work.titulo,
        editora: work.editora,
        foto: work.foto,
        autores: work.autores
      }

      return res.status(201).json(newWork)
    } catch (err) {
      return res.status(400).json({ error: 'Failed to create work.' })
    }
  }

  public async view (req: Request, res: Response): Promise<Response> {
    try {
      const work = await Obras.find().exec()

      const viewWorks = []

      work.map(element => {
        const data =
                {
                  id: element._id,
                  titulo: element.titulo,
                  editora: element.editora,
                  foto: element.foto,
                  autores: element.autores
                }
        viewWorks.push(data)
      })

      return res.status(200).json(viewWorks)
    } catch (err) {
      return res.status(400).json({ error: 'Error as ocurred.' })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const id = req.params.id

        interface IObras {
            titulo: string
            editora: string
            foto: string
            autores: string[]
        }

        let { titulo, editora, foto, autores } = <IObras>req.body

        try {
          const findWork = await Obras.findById(id)

          if (!titulo) titulo = findWork.titulo
          if (!editora) editora = findWork.editora
          if (!foto) foto = findWork.foto
          if (!autores) autores = findWork.autores

          if (!mongoose.isValidObjectId(id)) { return res.status(400).json({ error: 'Work is invalid.' }) }

          await Obras.findById(id, (err, doc) => {
            if (!doc) { return res.status(400).json({ error: 'Work not exists.' }) }
          })

          const work = await Obras.findOneAndUpdate({ _id: id }, {
            $set: {
              titulo: titulo,
              editora: editora,
              foto,
              autores
            }
          }, { new: true, useFindAndModify: false })

          work.save()

          const newWork = {
            id: work._id,
            titulo: work.titulo,
            editora: work.editora,
            foto: work.foto,
            autores: work.autores
          }

          return res.status(200).json(newWork)
        } catch (err) {
          return res.status(400).json({ error: 'Error as ocurred.' })
        }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const id = req.params.id

    try {
      if (!mongoose.isValidObjectId(id)) { return res.status(400).json({ error: 'Work is invalid' }) }

      if (!await Obras.findById(id)) { return res.status(400).json({ error: 'Work not found' }) }

      await Obras.findByIdAndDelete(id)

      return res.status(200).json({ success: 'Work deleted' })
    } catch (err) {
      return res.status(400).json({ error: 'Error as ocurred' })
    }
  }
}

export default new ObrasController()
