import Usuario from '../models/Usuario';
import IUsuario from '../interfaces/IUsuario';
import { AppDataSource } from '../../database/data-source';

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
            email: user.email,
            nome: user.nome,
            cpf: user.cpf,
            senha: user.senha,
            empresa: user.empresa
        });

        return userRepository.save(newUser);
    };
}

export default new UsuarioRepository;