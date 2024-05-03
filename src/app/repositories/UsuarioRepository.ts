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
        const newUser = userRepository.create({
            nome: user.nome,
            cpf: user.cpf,
            senha: user.senha,
            empresa: user.empresa,
            cargo: user.cargo
        } as DeepPartial<Usuario>);

        return userRepository.save(newUser);
    };
}

export default new UsuarioRepository;