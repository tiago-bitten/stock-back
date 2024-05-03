import { DeepPartial } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IEmpresa from "../interfaces/IEmpresa";
import Empresa from "../models/Empresa";

const empresaRepository = AppDataSource.getRepository(Empresa);

class EmpresaRepository {
    public getCompanies = (): Promise<IEmpresa[]> => {
        return empresaRepository.find();
    };

    public getCompany = ({ cnpj, id }: { cnpj?: string; id?: number }): Promise<IEmpresa | null> => {
        const whereClause = cnpj ? { cnpj } : id ? { id } : null;
        return whereClause ? empresaRepository.findOne({ where: whereClause }) : Promise.resolve(null);
    }

    public createNewCompany = (company: IEmpresa) => {
        const newCompany = empresaRepository.create({
            descricao: company.descricao,
            cnpj: company.cnpj,
            telefone: company.telefone,
            logradouro: company.logradouro,
            cidade: company.cidade,
            ativo: company.ativo
        } as DeepPartial<Empresa>);

        return empresaRepository.save(newCompany);
    }
}

export default new EmpresaRepository;