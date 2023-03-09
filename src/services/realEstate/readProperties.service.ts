import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { tAllProperties } from '../../interfaces/realEstate.interfaces';
import { allPropertiesSchema } from '../../schemas/realEstate.schemas';

const readPropertiesService = async (): Promise<tAllProperties> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const findRealEstate = await realEstateRepository.find({
        relations: {
            address: true,
            category: true
        }
    });
    const realEstates = allPropertiesSchema.parse(findRealEstate);
    return realEstates;
}

export default readPropertiesService;