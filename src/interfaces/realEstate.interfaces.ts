import { z } from 'zod';
import {
    createPropertySchema,
    createPropertyReturnSchema,
} from '../schemas/realEstate.schemas';

type tPropertyRequest = z.infer<typeof createPropertySchema>;

type tPropertyResponse = z.infer<typeof createPropertyReturnSchema>;

export {
    tPropertyRequest,
    tPropertyResponse
}