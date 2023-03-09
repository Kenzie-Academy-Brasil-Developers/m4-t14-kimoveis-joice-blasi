import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { AppError } from '../../errors';

const readRealEstateByCategoryService = async (idCategory: number): Promise<Category> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
    const realEstate = await categoryRepository.findOne({
        where: {
            id: idCategory
        },
        relations: {
            realEstate: true
        }
    })
    if (!realEstate) {
        throw new AppError('Category not found', 404);
    }

    return realEstate;
}

export default readRealEstateByCategoryService;