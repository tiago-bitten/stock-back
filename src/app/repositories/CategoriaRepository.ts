import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICategoria from "../interfaces/ICategoria";
import Categoria from "../models/Categoria";

class CategoriaRepository {
    private categoryRepository = AppDataSource.getRepository(Categoria);

    public getCategories = ({empresa, params}: {empresa: any, params?: any}): Promise<ICategoria[]> => {
        return this.categoryRepository
            .createQueryBuilder('categoria')
            .innerJoin('categoria.empresa', 'empresa')
            .select('categoria')
            .addSelect('empresa')
            .where('empresa.id = :empresa', { empresa })
            .skip(params.offset)
            .take(50)
            .getMany();
    }

    public getCategory = ({empresa, id}: {empresa: number, id: number}) => {
        const queryBuilder = this.categoryRepository
            .createQueryBuilder('categoria');

        queryBuilder.where('categoria.empresa = :empresa', { empresa });
        queryBuilder.where('categoria.id = :id', { id });
        
        return queryBuilder.getOne();
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