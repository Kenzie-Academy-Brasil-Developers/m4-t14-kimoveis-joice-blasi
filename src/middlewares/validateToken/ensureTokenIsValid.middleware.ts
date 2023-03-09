import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ensureTokenIsValidMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    let token = request.headers.authorization;
    if (!token) {
        throw new AppError('Missing bearer token', 401);
    }

    token = token.split(' ')[1];
    jwt.verify(
        token,
        process.env.SECRET_KEY!,
        (error, decoded: any) => {
            if (error) {
                throw new AppError(error.message, 401);
            }
            request.user = {
                admin: decoded?.admin,
                id: Number(decoded?.sub)
            }
            return next();
        }
    )
}

export default ensureTokenIsValidMiddleware;