/* eslint-disable eol-last */
import { Router } from 'express'

import ObrasController from '@controllers/ObrasController'

const routes = Router()

routes.post('/obras', ObrasController.create)
routes.get('/obras/', ObrasController.view)
routes.put('/obras/:id', ObrasController.update)
routes.delete('/obras/delete/:id', ObrasController.delete)

export default routes