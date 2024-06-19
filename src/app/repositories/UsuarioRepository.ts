import Usuario from '../models/Usuario';
import { AppDataSource } from '../../database/data-source';
import IUsuario from '../interfaces/IUsuario';
import { DeepPartial } from 'typeorm';
import ICargo from '../interfaces/ICargo';

class UsuarioRepository {
    private userRepository = AppDataSource.getRepository(Usuario);

    public getUsers = ({empresa, params}: {empresa: any, params?: any}): Promise<IUsuario[]> => {
        return this.userRepository
            .createQueryBuilder('usuario')
            .innerJoin('usuario.empresa', 'empresa')
            .leftJoin('usuario.cargo', 'cargo')
            .select('usuario')
            .addSelect('empresa')
            .addSelect('cargo')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    };
    
    public getUser = ({empresa, id}: {empresa?: number, id: number}) => {
        const queryBuilder = this.userRepository
            .createQueryBuilder('usuario');

        queryBuilder.where('usuario.id = :id', { id });
        (empresa) ? queryBuilder.andWhere('usuario.empresa = :empresa', { empresa }) : null;
        
        return queryBuilder.getOne();
    };

    public getUserRole = async (id: number): Promise<'ADMIN' | 'USER' | null> => {
        const user: IUsuario | null = await this.userRepository.findOne({ where: { id }, relations: ['cargo'] });
    
        if (!user || !user.cargo) return null;
    
        const userRole = (user.cargo as ICargo).nivel;
    
        return userRole;
    }
    
    public createNewUser = (user: IUsuario) => {
        const newUser = this.userRepository.create(user as DeepPartial<Usuario>);
        return this.userRepository.save(newUser);
    };

    public updateUser = (user: IUsuario) => {
        return this.userRepository.save(user as DeepPartial<Usuario>);
    };

    public deleteUser = (id: number) => {
        return this.userRepository.delete(id);
    };
}

export default new UsuarioRepository;