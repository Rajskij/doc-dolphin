import express from 'express';
import multer from 'multer';
import { parseMedicalTest, getResults, createReport, deleteResult } from '../controllers/labResultsController.js';

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

routes.post('/', upload.array('files', 10), parseMedicalTest);

routes.delete('/:result_id', deleteResult);
routes
    .route('/:user_id')
    .get(getResults)
    .post(createReport);

export default routes;
