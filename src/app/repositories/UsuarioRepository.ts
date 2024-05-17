import Usuario from '../models/Usuario';
import { AppDataSource } from '../../database/data-source';
import IUsuario from '../interfaces/IUsuario';
import { DeepPartial } from 'typeorm';

const userRepository = AppDataSource.getRepository(Usuario);

class UsuarioRepository {
    public getUsers = (): Promise<IUsuario[]> => {
        return userRepository.find();
    };
    
    public getUser = ({id, email}: {id?: number, email?: string}): Promise<IUsuario | null> => {
        const whereClause = id ? { id } : email ? { email } : null;
        return whereClause ? userRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    };
    
    public createNewUser = (user: IUsuario) => {
        const newUser = userRepository.create(user as DeepPartial<Usuario>);
        return userRepository.save(newUser);
    };

    public updateUser = (user: IUsuario) => {
        return userRepository.save(user as DeepPartial<Usuario>);
    };

    public deleteUser = (id: number) => {
        return userRepository.delete(id);
    };
}

export default new UsuarioRepository;