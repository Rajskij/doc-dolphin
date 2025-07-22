import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createEntry, getAllEntries, getEntry, updateEntry, deleteEntry } from '../controllers/moodJournalController.js';

const routes = express.Router();

routes
    .route('/:user_id')
    .post(authenticate, createEntry)
    .get(authenticate, getAllEntries);

routes
    .route('/mood/:id')
    .get(authenticate, getEntry)
    .put(authenticate, updateEntry)
    .delete(authenticate, deleteEntry);

export default routes;
