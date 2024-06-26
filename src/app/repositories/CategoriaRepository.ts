import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICategoria from "../interfaces/ICategoria";
import Categoria from "../models/Categoria";

class CategoriaRepository {
    private categoryRepository = AppDataSource.getRepository(Categoria);

    public getCategories = ({empresa, params}: {empresa: any, params: { skip: number, descricao?: string }}): Promise<ICategoria[]> => {
        return this.categoryRepository
            .createQueryBuilder('categoria')
            .select('categoria')
            .where(w => {
                w.where('categoria.empresa = :empresa', { empresa })

                if (params.descricao) {
                    w.andWhere('categoria.descricao LIKE :descricao', { descricao: `%${params.descricao}%` });
                }
            })
            .skip(params.skip)
            .take(50)
            .getMany();
    }

    public getCategory = ({empresa, id}: {empresa: number, id: number}) => {
        const categoria = this.categoryRepository
            .createQueryBuilder('categoria')
            .select('categoria')
            .where('categoria.empresa = :empresa', { empresa })
            .andWhere('categoria.id = :id', { id })
            .getOne();
        
        return categoria;
    }

    public createNewCategory = (category: ICategoria) => {
        const newCategory = this.categoryRepository.create(category as DeepPartial<Categoria>);
        return this.categoryRepository.save(newCategory);
    }

    public updateCategory = (category: ICategoria) => {
        return this.categoryRepository.save(category as DeepPartial<Categoria>);
    }

    public deleteCategory = (id: number) => {
        return this.categoryRepository.delete(id);
    }
}

export default new CategoriaRepository;