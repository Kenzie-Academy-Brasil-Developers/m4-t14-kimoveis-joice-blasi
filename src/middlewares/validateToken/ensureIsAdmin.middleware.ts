import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors';

const ensureIsAdminMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    const user = request.user;
    if (!user.admin) {
        throw new AppError('Insufficient permission', 403)
    }
    return next();
}

export default ensureIsAdminMiddleware;