import User from '../models/User';
import IUser from '../interfaces/IUser';
import { AppDataSource } from '../../database/data-source';

const userRepository = AppDataSource.getRepository(User);

class UserRepository {
    public getUsers = (): Promise<IUser[]> => {
        return userRepository.find();
    }
    
    public getUserByEmail = (email: string): Promise<IUser | null> => {
        return userRepository.findOne({ where: { email } });
    }
    
    public createNewUser = (user: IUser) => {
        const newUser = userRepository.create({
            email: user.email,
            name: user.name,
            CPF: user.CPF,
            password: user.password
        });

        return userRepository.save(newUser);
    }
}

export default new UserRepository;