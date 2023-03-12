import { createUserSchema, createUserReturnSchema, returnAllUsersSchema } from '../schemas/users.schemas';
import { z } from 'zod';
import { DeepPartial } from 'typeorm';

type tUserRequest = z.infer<typeof createUserSchema>;

type tUserResponse = z.infer<typeof createUserReturnSchema>;

type tAllUsers = z.infer<typeof returnAllUsersSchema>;

type tUserUpdate = DeepPartial<tUserRequest>;

export {
    tUserRequest,
    tUserResponse,
    tAllUsers,
    tUserUpdate
}