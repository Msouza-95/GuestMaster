import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/typeorm';
import '@shared/container';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';

import swaggerFile from '../../../shared/documentation/swagger.json';
import routes from './routes';

const app = express();

app.use(express.json());

app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);

    return response.status(500).json({
      type: 'error',
      message: 'Internal Server Error!',
      error: error.message,
    });
  },
);

export default app;
