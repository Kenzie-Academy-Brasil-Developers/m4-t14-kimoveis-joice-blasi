import { tUserRequest, tUserResponse } from '../../interfaces/users.interfaces';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { Repository } from 'typeorm';
import { createUserReturnSchema } from '../../schemas/users.schemas';

const createUserService = async (userData: tUserRequest): Promise<tUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    await userRepository.save(user);
    const newUser = createUserReturnSchema.parse(user);
    return newUser;
}

export default createUserService;