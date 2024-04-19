import { Request, Response, NextFunction } from 'express';
import EmpresaRepository from '../repositories/EmpresaRepository';

class EmpresaController {
    public getCompanies = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const companies = await EmpresaRepository.getCompanies();

            return res.status(200).send({
                companies
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    };

    public storeCompany = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const companyRepository = EmpresaRepository;

            const { descricao, cnpj, telefone, contrato, logradouro, cidade, ativo } = req.body;

            if (!descricao || !cnpj || !telefone || !contrato || !logradouro || !cidade || !ativo) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const companyExists = await companyRepository.getCompany(cnpj);

            if (companyExists != null) {
                return res.status(409).json({ message: 'Company already exists' });
            }

            const newCompany = await companyRepository.createNewCompany(
                { descricao, cnpj, telefone, contrato, logradouro, cidade, ativo }
            );

            return res.status(201).json({
                message: 'Company created successfully',
                company: newCompany
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new EmpresaController;