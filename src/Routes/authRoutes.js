import { Router } from 'express'

import AuthController from '../Controller/authController.js';
const authController = new AuthController();

const authRoutes = Router();

authRoutes.post('/', authController.auth)

export default authRoutes;