import { z } from 'zod';
import { createPropertySchema, createPropertyReturnSchema, createPropertyWithoutAddress, allPropertiesSchema } from '../schemas/realEstate.schemas';

type tPropertyRequest = z.infer<typeof createPropertySchema>;

type tPropertyResponse = z.infer<typeof createPropertyReturnSchema>;

type tPropertyRequestWithoutAddress = z.infer<typeof createPropertyWithoutAddress>;

type tAllProperties = z.infer<typeof allPropertiesSchema>;

export {
    tPropertyRequest,
    tPropertyResponse,
    tPropertyRequestWithoutAddress,
    tAllProperties
}