import { Request } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate, Schedule, User } from '../../entities';
import { AppError } from '../../errors';
import { tCreateSchedule } from '../../interfaces/schedules.interfaces';

const createScheduleService = async (request: Request): Promise<object> => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const scheduleData: tCreateSchedule = request.body;
    const findRealEstate: RealEstate | null = await realEstateRepository.findOne({
        where: {
            id: scheduleData.realEstateId
        }
    })
    if (!findRealEstate) {
        throw new AppError('RealEstate not found', 404);
    }

    const findSchedule = await scheduleRepository.createQueryBuilder('schedules_users_properties').
        where('schedules_users_properties.date = :date', { date: scheduleData.date }).
        andWhere('schedules_users_properties.hour = :hour', { hour: scheduleData.hour }).
        andWhere('schedules_users_properties.realEstateId = :id', { id: scheduleData.realEstateId }).
        getOne();
    if (findSchedule) {
        throw new AppError('Schedule to this real estate at this date and time already exists', 409);
    }

    const day = new Date(scheduleData.date).toString().split(' ')[0];
    if (day === 'Sat' || day === 'Sun') {
        throw new AppError('Invalid date, work days are monday to friday', 400);
    }

    const hour = scheduleData.hour.split(':');
    if (Number(hour[0] + hour[1]) < 800 || Number(hour[0] + hour[1]) > 1800) {
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
    }

    const idUser = request.user.id;
    const user = await userRepository.findOne({
        where: {
            id: idUser
        }
    });

    const findUserScheduling = await userRepository.createQueryBuilder('user').
        innerJoinAndSelect('user.schedule', 'schedules_users_properties').
        where('user.id = :idUser', { idUser }).
        andWhere('schedules_users_properties.date = :date', { date: scheduleData.date }).
        andWhere('schedules_users_properties.hour = :hour', { hour: scheduleData.hour }).
        getOne();

    if (findUserScheduling) {
        throw new AppError('User schedule to this real estate at this date and time already exists', 409);
    }

    const schedule = scheduleRepository.create({
        date: scheduleData.date,
        hour: scheduleData.hour,
        user: user!,
        realEstate: findRealEstate
    });
    await scheduleRepository.save(schedule);
    return { message: 'Schedule created' };
}

export default createScheduleService;