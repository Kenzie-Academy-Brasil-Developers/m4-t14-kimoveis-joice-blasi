import { z } from 'zod';

const createAddressSchema = z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).optional().nullable(),
    city: z.string().max(20),
    state: z.string().max(2)
});

const createAddressReturnSchema = createAddressSchema.extend({
    id: z.number()
});

export {
    createAddressSchema,
    createAddressReturnSchema
};