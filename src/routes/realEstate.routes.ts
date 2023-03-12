import { Router } from 'express';
import {
    createPropertyController,
    readPropertiesController
} from '../controllers/realEstate.controllers';
import ensureAddressIsValidMiddleware from '../middlewares/address/ensureAddressIsValid.middleware';
import ensureDataIsValidMiddleware from '../middlewares/users/ensureDataIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/validateToken/ensureIsAdmin.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/validateToken/ensureTokenIsValid.middleware';
import { createPropertySchema } from '../schemas/realEstate.schemas';

const realEstateRoutes: Router = Router();

realEstateRoutes.post('',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    ensureDataIsValidMiddleware(createPropertySchema),
    ensureAddressIsValidMiddleware,
    createPropertyController
);

realEstateRoutes.get('', readPropertiesController);

export default realEstateRoutes;