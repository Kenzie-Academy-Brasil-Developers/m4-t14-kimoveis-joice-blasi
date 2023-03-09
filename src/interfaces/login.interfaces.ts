import { z } from 'zod';
import { createLoginSchema } from '../schemas/login.schemas';

type tLoginRequest = z.infer<typeof createLoginSchema>;

export { tLoginRequest };