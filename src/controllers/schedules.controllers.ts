import { Request, Response } from 'express';
import createScheduleService from '../services/schedules/createSchedule.service';
import readSchedulesByRealEstateService from '../services/schedules/readSchedulesByRealEstate.service';

const createScheduleController = async (request: Request, response: Response): Promise<Response> => {
    const newSchedule = await createScheduleService(request);
    return response.status(201).json(newSchedule);
}

const readSchedulesByRealEstateController = async (request: Request, response: Response): Promise<Response> => {
    const idRealEstate = parseInt(request.params.id);
    const schedules = await readSchedulesByRealEstateService(idRealEstate);
    return response.json(schedules);
}

export {
    createScheduleController,
    readSchedulesByRealEstateController
}