import express from 'express';
import { getUsers, createUser, loginUser } from '../controllers/userController.js';

const routes = express.Router();

routes.get('/', getUsers)
routes.post('/signup', createUser);
routes.post('/login', loginUser);

export default routes;
