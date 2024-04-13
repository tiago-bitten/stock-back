import Usuario from '../models/Usuario';
import IUsuario from '../interfaces/IUsuario';
import { AppDataSource } from '../../database/data-source';

const userRepository = AppDataSource.getRepository(Usuario);

class UsuarioRepository {
    public getUsers = (): Promise<IUsuario[]> => {
        return userRepository.find();
    };
    
    public getUserByEmail = (email: string): Promise<IUsuario | null> => {
        return userRepository.findOne({ where: { email } });
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