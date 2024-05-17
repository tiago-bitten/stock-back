import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import ICategoria from "../interfaces/ICategoria";
import Categoria from "../models/Categoria";

const categoryRepository = AppDataSource.getRepository(Categoria);

class CategoriaRepository {
    public getCategories = (): Promise<ICategoria[]> => {
        return categoryRepository.find();
    }

    public getCategory = ({id, descricao}: {id?: number, descricao?: string}): Promise<ICategoria | null> => {
        const whereClause = id ? { id } : descricao ? { descricao } : null;
        return whereClause ? categoryRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    }

    public createNewCategory = (category: ICategoria) => {
        const newCategory = categoryRepository.create(category as DeepPartial<Categoria>);
        return categoryRepository.save(newCategory);
    }

    public updateCategory = (category: ICategoria) => {
        return categoryRepository.save(category as DeepPartial<Categoria>);
    }

    public deleteCategory = (id: number) => {
        return categoryRepository.delete(id);
    }
}

export default new CategoriaRepository;