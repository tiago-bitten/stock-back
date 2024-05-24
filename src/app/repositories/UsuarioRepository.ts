import Usuario from '../models/Usuario';
import { AppDataSource } from '../../database/data-source';
import IUsuario from '../interfaces/IUsuario';
import { DeepPartial } from 'typeorm';
import ICargo from '../interfaces/ICargo';

const userRepository = AppDataSource.getRepository(Usuario);

class UsuarioRepository {
    public getUsers = (): Promise<IUsuario[]> => {
        return userRepository.find({ relations: ['empresa', 'cargo'] });
    };
    
    public getUser = ({id, email}: {id?: number, email?: string}): Promise<IUsuario | null> => {
        const whereClause = id ? { id } : email ? { email } : null;
        return whereClause ? userRepository.findOne({ where: whereClause, relations: ['empresa', 'cargo'] }) : Promise.resolve(null);
    };

    public getUserRole = async (id: number): Promise<'ADMIN' | 'USER' | null> => {
        const user: IUsuario | null = await userRepository.findOne({ where: { id }, relations: ['cargo'] });
    
        if (!user || !user.cargo) return null;
    
        const userRole = (user.cargo as ICargo).nivel;
    
        return userRole;
    }
    
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