import { z } from 'zod';
import {
    allCategoriesSchema,
    categoryIdSchema,
    createCategoryReturnSchema,
    createCategorySchema
} from '../schemas/categories.schemas';

type tCategoryRequest = z.infer<typeof createCategorySchema>;

type tCategoryResponse = z.infer<typeof createCategoryReturnSchema>;

type tAllCategories = z.infer<typeof allCategoriesSchema>;

type tCategoryId = z.infer<typeof categoryIdSchema>;


export {
    tCategoryRequest,
    tCategoryResponse,
    tAllCategories,
    tCategoryId
}