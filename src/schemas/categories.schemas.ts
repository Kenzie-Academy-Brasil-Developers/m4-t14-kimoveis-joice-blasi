import { z } from 'zod';

const createCategorySchema = z.object({
    name: z.string()
});

const createCategoryReturnSchema = createCategorySchema.extend({
    id: z.number()
});

const categoryIdSchema = createCategoryReturnSchema.omit({
    name: true
})

const allCategoriesSchema = createCategoryReturnSchema.array();

export {
    createCategorySchema,
    createCategoryReturnSchema,
    allCategoriesSchema,
    categoryIdSchema,
};