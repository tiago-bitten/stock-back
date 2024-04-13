import { AppDataSource } from "../../database/data-source";
import IEmpresa from "../interfaces/IEmpresa";
import Empresa from "../models/Empresa";

const empresaRepository = AppDataSource.getRepository(Empresa);

class EmpresaRepository {
    public getCompanies = (): Promise<IEmpresa[]> => {
        return empresaRepository.find();
    };

    public getCompanyByCnpj = (cnpj: string): Promise<IEmpresa | null> => {
        return empresaRepository.findOne({ where: { cnpj } });
    }

    public createNewCompany = (company: IEmpresa) => {
        const newCompany = empresaRepository.create({
            descricao: company.descricao,
            cnpj: company.cnpj,
            telefone: company.telefone,
            contrato: company.contrato,
            logradouro: company.logradouro,
            cidade: company.cidade,
            ativo: company.ativo,
            quantidadeUsuarios: company.quantidadeUsuarios
        });

        return empresaRepository.save(newCompany);
    }
}

export default new EmpresaRepository;