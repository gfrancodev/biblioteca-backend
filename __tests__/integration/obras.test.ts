import request from 'supertest'

import { titulo, editora, foto, autores } from './obra.json'

import app from '../../src/app'

describe('Construction management', (): void => {
  let workID: string

  it('Must create a work', async (): Promise<void> => {
    const response = await request(app).post('/obras').send({ titulo, editora, foto, autores })

    workID = response.body.id

    expect(response.status).toBe(201)
  })

  it('Must return a erro in create work', async (): Promise<void> => {
    const response = await request(app).post('/obras')

    expect(response.status).toBe(400)
  })

  it('Must display works', async (): Promise<void> => {
    const response = await request(app).get('/obras/')

    expect(response.status).toBe(200)
  })

  it('Must return a error in update work', async (): Promise<void> => {
    const response = await request(app).put('/obras/' + '1234145')

    expect(response.status).toBe(400)
  })

  it('Must update a work', async (): Promise<void> => {
    const response = await request(app).put('/obras/' + workID).send({ titulo: 'Novo titulo', editora: 'Nova editora' })

    expect(response.status).toBe(200)
  })

  it('Must delete a work', async (): Promise<void> => {
    const response = await request(app).delete('/obras/delete/' + workID)

    expect(response.status).toBe(200)
  })

  it('Must return a error in delete work', async (): Promise<void> => {
    const response = await request(app).delete('/obras/delete/' + '123445412')

    expect(response.status).toBe(400)
  })
})
