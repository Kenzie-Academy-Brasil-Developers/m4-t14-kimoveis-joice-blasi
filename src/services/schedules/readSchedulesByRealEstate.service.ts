import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { AppError } from '../../errors';

const readSchedulesByRealEstateService = async (idRealEstate: number) => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const findRealEstate = await realEstateRepository.findOne({
        where: {
            id: idRealEstate
        }
    })
    if (!findRealEstate) {
        throw new AppError('RealEstate not found', 404)
    }
}

export default readSchedulesByRealEstateService;