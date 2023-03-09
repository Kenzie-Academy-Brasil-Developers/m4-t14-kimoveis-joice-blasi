import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { tAllCategories } from '../../interfaces/categories.interfaces';
import { allCategoriesSchema } from '../../schemas/categories.schemas';

const readCategoriesService = async (): Promise<tAllCategories> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
    const findCategories = await categoryRepository.find();
    const categories = allCategoriesSchema.parse(findCategories);
    return categories;
}

export default readCategoriesService;