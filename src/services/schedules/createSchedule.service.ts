import { Request } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate, Schedule, User } from '../../entities';
import { AppError } from '../../errors';
import { tCreateReturnSchedule, tCreateSchedule } from '../../interfaces/schedules.interfaces';
import { createScheduleReturnSchema } from '../../schemas/schedules.schemas';

const createScheduleService = async (request: Request): Promise<tCreateReturnSchedule> => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const scheduleData: tCreateSchedule = request.body;
    const findRealEstate = await realEstateRepository.findOne({
        where: {
            id: scheduleData.realEstateId
        }
    })
    if (!findRealEstate) {
        throw new AppError('RealEstate not found', 404);
    }
    const idUser = request.user.id;
    const user = await userRepository.findOne({
        where: {
            id: idUser
        }
    })
    const schedule = scheduleRepository.create({
        ...scheduleData,
        user: user!,
        realEstate: findRealEstate

    });
    await scheduleRepository.save(schedule);
    const newSchedule = createScheduleReturnSchema.parse(schedule);
    return newSchedule;
}

export default createScheduleService;