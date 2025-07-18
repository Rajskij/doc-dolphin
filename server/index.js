import express from 'express';
import dotenv from 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/usersRoute.js';
import testRoute from './routes/labResultsRoute.js';

import cors from 'cors';

const app = express();
await mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/results', testRoute);

app.use((err, req, res, next) => {
    const { status, message } = err;
    console.log(err)
    console.log(message)
    res.status(status ? status : 500).json(message ? message : 'Server Error');
})

app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}...`));
