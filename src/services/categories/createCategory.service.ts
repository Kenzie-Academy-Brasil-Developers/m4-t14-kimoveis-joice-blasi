import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { tCategoryRequest, tCategoryResponse } from '../../interfaces/categories.interfaces';
import { createCategoryReturnSchema } from '../../schemas/categories.schemas';

const createCategoryService = async (categoryData: tCategoryRequest): Promise<tCategoryResponse> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
    const category = categoryRepository.create(categoryData);
    await categoryRepository.save(category);
    const newCategory = createCategoryReturnSchema.parse(category);
    return newCategory;
}

export default createCategoryService;