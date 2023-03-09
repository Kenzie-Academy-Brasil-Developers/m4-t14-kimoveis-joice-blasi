import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { tAllUsers } from '../../interfaces/users.interfaces';
import { returnAllUsersSchema } from '../../schemas/users.schemas';

const readUsersService = async (): Promise<tAllUsers> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const findUsers = await userRepository.find();
    const users = returnAllUsersSchema.parse(findUsers);
    return users;
}

export default readUsersService;