import Usuario from '../models/Usuario';
import { AppDataSource } from '../../database/data-source';
import IUsuario from '../interfaces/IUsuario';
import { DeepPartial } from 'typeorm';
import ICargo from '../interfaces/ICargo';

class UsuarioRepository {
    private userRepository = AppDataSource.getRepository(Usuario);

    public getUsers = ({empresa, params}: {empresa: any, params: { skip: number, nome?: string, email?: string, cpf?: string, cargo?: number}}): Promise<IUsuario[]> => {
        return this.userRepository
            .createQueryBuilder('usuario')
            .innerJoin('usuario.empresa', 'empresa')
            .leftJoin('usuario.cargo', 'cargo')
            .select('usuario')
            .addSelect('empresa')
            .addSelect('cargo')
            .where(w => {
                w.where('usuario.empresa = :empresa', { empresa })

                if (params.nome) {
                    w.andWhere('usuario.nome LIKE :nome', { nome: `%${params.nome}%` });
                }

                if (params.email) {
                    w.andWhere('usuario.email LIKE :email', { email: `%${params.email}%` });
                }

                if (params.cpf) {
                    w.andWhere('usuario.cpf LIKE :cpf', { cpf: `%${params.cpf}%` });
                }

                if (params.cargo) {
                    w.andWhere('usuario.cargo = :cargo', { cargo: params.cargo });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    };
    
    public getUser = ({empresa, id, email}: {empresa?: number, id?: number, email?: string}) => {
        const user = this.userRepository
            .createQueryBuilder('usuario')
            .innerJoin('usuario.empresa', 'empresa')
            .select('usuario')
            .addSelect('empresa')
            .where(w => {
                if (id) {
                    w.where('usuario.id = :id', { id });
                }
                
                if (empresa) {
                    w.andWhere('usuario.empresa = :empresa', { empresa });
                }

                if (email) {
                    w.andWhere('usuario.email = :email', { email });
                }
            })
            .getOne();
        
        return user;
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