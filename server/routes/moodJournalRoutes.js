import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createMood, getAllMoods, getMood, updateMood, deleteMood, generateMoodInsights } from '../controllers/moodJournalController.js';

const routes = express.Router();

routes
    .route('/:user_id')
    .post(authenticate, createMood)
    .get(authenticate, getAllMoods);

routes
    .route('/mood/:id')
    .get(authenticate, getMood)
    .put(authenticate, updateMood)
    .delete(authenticate, deleteMood);

routes.post('/analyze/:user_id', authenticate, generateMoodInsights);

export default routes;
