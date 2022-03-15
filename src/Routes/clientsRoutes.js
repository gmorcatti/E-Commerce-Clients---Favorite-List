import { Router } from 'express';

import ClientsController from '../Controller/clientsController.js';

import AuthMiddleware from '../Middlewares/auth.js';

const clientsController = new ClientsController();

const authMiddleware = new AuthMiddleware();

const clientsRoutes = Router();

/* This method was created just to facilitate the authorization tests (simulating a Admin User)
    Obviously it won't be used in a Production Environment.
    The purpose is just allow the tester to create a admin user, the other routes need a admin token to execute.
*/
clientsRoutes.post('/admin', clientsController.createAdmin)

clientsRoutes.use(authMiddleware.auth);

clientsRoutes.put('/favoriteProduct/:productId', clientsController.insertFavoriteProduct)
clientsRoutes.delete('/favoriteProduct/:productId', clientsController.removeFavoriteProduct)

clientsRoutes.post('/', authMiddleware.authorizeAdmin, clientsController.create)
clientsRoutes.put('/:id', authMiddleware.authorizeAdmin, clientsController.update)
clientsRoutes.get('/:email', authMiddleware.authorizeAdmin, clientsController.getByEmail)
clientsRoutes.delete('/:id', authMiddleware.authorizeAdmin, clientsController.remove)

export default clientsRoutes;