import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { tUserUpdate, tUserResponse } from '../../interfaces/users.interfaces';
import { createUserReturnSchema } from '../../schemas/users.schemas';

const updateUserService = async (userData: tUserUpdate, idParam: number): Promise<tUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const oldUser = await userRepository.findOne({
        where: {
            id: idParam
        }
    })
    const user = userRepository.create({
        ...oldUser,
        ...userData
    });
    await userRepository.save(user);
    const updatedUser = createUserReturnSchema.parse(user);
    return updatedUser;
}

export default updateUserService;