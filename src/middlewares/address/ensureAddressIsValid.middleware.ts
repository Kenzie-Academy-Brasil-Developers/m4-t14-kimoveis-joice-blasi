import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Address } from '../../entities';
import { AppError } from '../../errors';
import { tPropertyRequest } from '../../interfaces/realEstate.interfaces';

const ensureAddressIsValidMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
    const addressData: tPropertyRequest = request.body;
    if (!addressData.address) {
        throw new AppError('falta endereço', 400)
    }
    const findAddress = await addressRepository.findOne({
        where: {
            street: addressData.address.street,
            zipCode: addressData.address.zipCode,
            number: addressData.address.number ? addressData.address.number : '',
            city: addressData.address.city,
            state: addressData.address.state
        }
    })
    if (findAddress) {
        throw new AppError('Address already exists', 409);
    }
    return next();
}

export default ensureAddressIsValidMiddleware;