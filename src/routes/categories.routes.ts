import { Router } from 'express';
import {
    createCategoryController,
    readCategoriesController,
    readRealEstateByCategoryController
} from '../controllers/categories.controllers';
import ensureNameIsValidMiddleware from '../middlewares/categories/ensureNameIsValid.middleware';
import ensureDataIsValidMiddleware from '../middlewares/users/ensureDataIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/validateToken/ensureIsAdmin.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/validateToken/ensureTokenIsValid.middleware';
import { createCategorySchema } from '../schemas/categories.schemas';

const categoryRoutes: Router = Router();

categoryRoutes.post('',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureDataIsValidMiddleware(createCategorySchema),
    ensureNameIsValidMiddleware,
    createCategoryController
);

categoryRoutes.get('', readCategoriesController);

categoryRoutes.get('/:id/realEstate', readRealEstateByCategoryController);

export default categoryRoutes;