import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';

const ensureDataIsValidMiddleware = (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction): void => {
    const validatedData = schema.parse(request.body);
    request.body = validatedData;
    return next();
}

export default ensureDataIsValidMiddleware;