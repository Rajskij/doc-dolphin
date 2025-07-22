import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getUsers, createUser, loginUser } from '../controllers/userController.js';

const routes = express.Router();

routes.get('/', authenticate, getUsers)
routes.post('/signup', createUser);
routes.post('/login', loginUser);

export default routes;
