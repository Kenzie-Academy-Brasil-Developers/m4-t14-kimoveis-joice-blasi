import { z } from 'zod';
import { createAddressSchema, createAddressReturnSchema } from '../schemas/addresses.schemas';

type tAddressRequest = z.infer<typeof createAddressSchema>;

type tAddressResponse = z.infer<typeof createAddressReturnSchema>;

export {
    tAddressRequest,
    tAddressResponse
}