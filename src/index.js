import express from "express";

import 'dotenv/config';
import 'express-async-errors';

import routes from './Routes/index.js';
import errorHandler from './Errors/ErrorHandler.js'

const app = express();

app.use(express.json());

routes(app);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`))