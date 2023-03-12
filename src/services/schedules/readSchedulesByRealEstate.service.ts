import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { AppError } from '../../errors';

const readSchedulesByRealEstateService = async (idRealEstate: number): Promise<RealEstate | null> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const findRealEstate = await realEstateRepository.findOne({
        where: {
            id: idRealEstate
        }
    })
    if (!findRealEstate) {
        throw new AppError('RealEstate not found', 404)
    }

    const findSchedules = await realEstateRepository.createQueryBuilder('real_estate').
        innerJoinAndSelect('real_estate.address', 'address').
        innerJoinAndSelect('real_estate.category', 'category').
        innerJoinAndSelect('real_estate.schedules', 'schedules_users_properties').
        innerJoinAndSelect('schedules_users_properties.user', 'user').
        where('real_estate.id = :id', { id: idRealEstate }).
        getOne();
    return findSchedules;
}

export default readSchedulesByRealEstateService;