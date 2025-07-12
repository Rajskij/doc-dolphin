import express from 'express';
import { getUsers, createUser, loginUser } from '../controllers/userController.js';

const routes = express.Router();

routes
    .route('/users')
    .get(getUsers)

routes.post('/users/signup', createUser);

routes.post('/users/login', loginUser);

export default routes;
