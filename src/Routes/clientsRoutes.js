import { Router } from 'express';

import ClientsController from '../Controller/clientsController.js';

import AuthMiddleware from '../Middlewares/auth.js';

const clientsController = new ClientsController();

const authMiddleware = new AuthMiddleware();

const clientsRoutes = Router();

clientsRoutes.use(authMiddleware.auth);

clientsRoutes.post('/', authMiddleware.authorizeAdmin, clientsController.create)
clientsRoutes.put('/:id', authMiddleware.authorizeAdmin, clientsController.update)
clientsRoutes.get('/:email', authMiddleware.authorizeAdmin, clientsController.getByEmail)
clientsRoutes.delete('/:id', authMiddleware.authorizeAdmin, clientsController.remove)
clientsRoutes.put('/:id/favorite', clientsController.insertFavoriteProduct)
clientsRoutes.delete('/:id/favorite', clientsController.removeFavoriteProduct)

export default clientsRoutes;