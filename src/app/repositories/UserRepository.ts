import Usuario from '../models/Usuario';
import IUsuario from '../interfaces/IUsuario';
import { AppDataSource } from '../../database/data-source';

const userRepository = AppDataSource.getRepository(Usuario);

const getUsuarios = (): Promise<IUsuario[]> => {
    return userRepository.find();
}

export default { getUsuarios };