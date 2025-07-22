import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth.js';
import { parseMedicalTest, getResults, getResult, createReport, deleteResult, updateResult } from '../controllers/labResultsController.js';

const multerOptions = {
    storage: multer.memoryStorage(), // Store files in memory for processing
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        cb(null, allowedTypes.includes(file.mimetype));
    },
    onError: (err, next) => {
        console.error('Multer error:', err);
        next(err);
    }
};

const upload = multer(multerOptions);
const routes = express.Router();

routes.post('/analyze', upload.array('files', 10), authenticate, parseMedicalTest);

routes
    .route('/:result_id')    
    .get(authenticate, getResult)
    .patch(authenticate, updateResult)
    .delete(authenticate, deleteResult);

routes
    .route('/user/:user_id')
    .get(authenticate, getResults)
    .post(authenticate, createReport);

export default routes;
