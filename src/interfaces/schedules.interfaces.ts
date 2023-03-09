import { z } from 'zod';
import { createScheduleReturnSchema, createScheduleSchema } from '../schemas/schedules.schemas';

type tCreateSchedule = z.infer<typeof createScheduleSchema>;

type tCreateReturnSchedule = z.infer<typeof createScheduleReturnSchema>;

export {
    tCreateSchedule,
    tCreateReturnSchedule
}