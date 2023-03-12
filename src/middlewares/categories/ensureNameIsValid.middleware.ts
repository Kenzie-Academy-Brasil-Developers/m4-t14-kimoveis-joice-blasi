import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { AppError } from '../../errors';

const ensureNameIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const nameCategory = request.body.name;
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
    const findName = await categoryRepository.findOne({
        where: {
            name: nameCategory
        }
    });

    if (findName) {
        throw new AppError('Category already exists', 409);
    }
    return next();
}

export default ensureNameIsValidMiddleware;