import { z } from 'zod';
import { createAddressReturnSchema, createAddressSchema } from './addresses.schemas';
import { createCategoryReturnSchema } from './categories.schemas';

const createPropertySchema = z.object({
    value: z.string().regex(/\d+/).transform(Number).refine((value) => value >= 0).or(z.number().positive()),
    size: z.number().positive(),
    address: createAddressSchema,
    categoryId: z.number()
});

const createPropertyReturnSchema = z.object({
    id: z.number(),
    value: z.string().regex(/\d+/).transform(Number).refine((value) => value >= 0).or(z.number().positive()),
    size: z.number().positive(),
    sold: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: createAddressReturnSchema,
    category: createCategoryReturnSchema
});

const createPropertyWithoutAddress = createPropertySchema.omit({ address: true });

const allPropertiesSchema = createPropertyReturnSchema.array();


export {
    createPropertySchema,
    createPropertyReturnSchema,
    createPropertyWithoutAddress,
    allPropertiesSchema
}