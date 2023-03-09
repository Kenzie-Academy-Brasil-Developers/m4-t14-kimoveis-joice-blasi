import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { tLoginRequest } from '../../interfaces/login.interfaces';
import 'dotenv/config';

const createLoginService = async (loginData: tLoginRequest): Promise<string> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepository.findOneBy({
        email: loginData.email
    })
    if (!user) {
        throw new AppError('Invalid credentials', 401);
    }

    const passwordMatch = await compare(loginData.password, user.password);
    if (!passwordMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    const token: string = jwt.sign(
        {
            admin: user.admin,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(user.id)
        }
    )
    return token;
}

export default createLoginService;