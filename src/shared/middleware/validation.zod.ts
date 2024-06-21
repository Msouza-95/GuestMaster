import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import AppError from '@shared/errors/AppError';


/* middleware para validação de rotas com zod */
export const validateSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = fromZodError(error);
        return next(new AppError('Validation failed :' + validationErrors, 400));
      }
      next(new AppError('Validation failed', 400));
    }
  };
};
