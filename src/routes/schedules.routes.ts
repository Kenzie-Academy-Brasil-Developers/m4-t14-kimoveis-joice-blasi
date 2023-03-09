import { Router } from 'express';
import { createScheduleController, readSchedulesByRealEstateController } from '../controllers/schedules.controllers';
import ensureDataIsValidMiddleware from '../middlewares/users/ensureDataIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/validateToken/ensureIsAdmin.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/validateToken/ensureTokenIsValid.middleware';
import { createScheduleSchema } from '../schemas/schedules.schemas';

const schedulesRoutes: Router = Router();

schedulesRoutes.post('',
    ensureTokenIsValidMiddleware,
    ensureDataIsValidMiddleware(createScheduleSchema),
    createScheduleController
);

schedulesRoutes.get('/realEstate/:id',
    ensureTokenIsValidMiddleware,
    ensureIsAdminMiddleware,
    readSchedulesByRealEstateController
);

export default schedulesRoutes;