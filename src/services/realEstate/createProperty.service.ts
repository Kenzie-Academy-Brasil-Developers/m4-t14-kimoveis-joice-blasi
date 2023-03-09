import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Address, Category, RealEstate } from '../../entities';
import { AppError } from '../../errors';
import { tCategoryResponse } from '../../interfaces/categories.interfaces';
import { tPropertyRequest, tPropertyResponse } from '../../interfaces/realEstate.interfaces';
import { createAddressReturnSchema } from '../../schemas/addresses.schemas';
import { createPropertyReturnSchema } from '../../schemas/realEstate.schemas';

const createPropertyService = async (propertyData: tPropertyRequest): Promise<tPropertyResponse> => {
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const newAddress = addressRepository.create(propertyData.address);
    await addressRepository.save(newAddress);
    createAddressReturnSchema.parse(newAddress);

    const findCategory: tCategoryResponse | null = await categoryRepository.findOne({
        where: {
            id: propertyData.categoryId
        }
    })
    if (!findCategory) {
        throw new AppError('Category not found', 404);
    }

    const realEstate = realEstateRepository.create({
        size: propertyData.size,
        value: propertyData.value,
        address: newAddress,
        category: findCategory
    });
    await realEstateRepository.save(realEstate);


    let newRealEstate: tPropertyResponse = createPropertyReturnSchema.parse(realEstate);
    return newRealEstate;
}

export default createPropertyService;