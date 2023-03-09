import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';

const ensureEmailDontExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const emailUser = request.body.email;
    if (emailUser) {
        const findEmail = await userRepository.findOne({
            withDeleted: true,
            where: {
                email: emailUser,
            }
        });
        if (findEmail) {
            throw new AppError('Email already exists', 409);
        }
    }
    return next();
}

export default ensureEmailDontExistsMiddleware;