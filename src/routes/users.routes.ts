import { Router } from 'express';
import {
    createUserController,
    readUsersController,
    softDeleteUserController,
    updateUserController
} from '../controllers/users.controllers';
import ensureDataIsValidMiddleware from '../middlewares/users/ensureDataIsValid.middleware';
import ensureEmailDontExistsMiddleware from '../middlewares/users/ensureEmailDontExists.middleware';
import ensureIsAdminMiddleware from '../middlewares/validateToken/ensureIsAdmin.middleware';
import ensurePermissionAdminUserMiddleware from '../middlewares/validateToken/ensurePermissionAdminUser.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/validateToken/ensureTokenIsValid.middleware';
import ensureUserExistsMiddleware from '../middlewares/users/ensureUserExists.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/users.schemas';

const userRoutes: Router = Router();

userRoutes.post('',
    ensureDataIsValidMiddleware(createUserSchema),
    ensureEmailDontExistsMiddleware,
    createUserController
);

userRoutes.get('',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    readUsersController
);

userRoutes.patch('/:id',
    ensureTokenIsValidMiddleware,
    ensureUserExistsMiddleware,
    ensurePermissionAdminUserMiddleware,
    ensureDataIsValidMiddleware(updateUserSchema),
    ensureEmailDontExistsMiddleware,
    updateUserController)

userRoutes.delete('/:id',
    ensureTokenIsValidMiddleware,
    ensureUserExistsMiddleware,
    ensureIsAdminMiddleware,
    softDeleteUserController
);

export default userRoutes;