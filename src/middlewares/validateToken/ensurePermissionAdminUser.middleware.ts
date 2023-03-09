import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors';

const ensurePermissionAdminUserMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    const idParam: number = parseInt(request.params.id);
    const user = request.user;
    if (!user.admin) {
        if (user.id !== idParam) {
            throw new AppError('Insufficient permission', 403);
        }
    }
    return next();
}

export default ensurePermissionAdminUserMiddleware;