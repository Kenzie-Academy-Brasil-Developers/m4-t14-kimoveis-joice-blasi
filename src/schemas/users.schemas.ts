import { z } from 'zod';

const createUserSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().max(45).email(),
    admin: z.boolean().optional().default(false),
    password: z.string().max(20)
});

const updateUserSchema = createUserSchema.partial().omit({ admin: true });

const createUserReturnSchema = createUserSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
}).omit({
    password: true
});

const returnAllUsersSchema = createUserReturnSchema.array();

export {
    createUserSchema,
    updateUserSchema,
    createUserReturnSchema,
    returnAllUsersSchema
};