import express from 'express';
import multer from 'multer';
import { parseMedicalTest } from '../controllers/labResultsController.js';

const multerOptions = {
    storage: multer.memoryStorage(), // Store files in memory for processing
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        console.log('hello', file)
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only image files are allowed.'));
        }
    },
};

const upload = multer(multerOptions);
const routes = express.Router();

routes
    .route('/')
    .post(upload.single('file'), parseMedicalTest);

export default routes;
