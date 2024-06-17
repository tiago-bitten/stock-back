import { Request, Response, NextFunction } from 'express';
import EmpresaRepository from '../repositories/EmpresaRepository';
import UsuarioRepository from '../repositories/UsuarioRepository';

class EmpresaController {
    public getCompanies = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

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

            const { descricao, cnpj, telefone, logradouro, cidade, ativo, usuario } = req.body;

            if (!descricao || !cnpj || !telefone || !logradouro || !cidade || !ativo) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const companyExists = await companyRepository.getCompany(cnpj);

            if (companyExists != null) {
                return res.status(409).json({ message: 'Company already exists' });
            }

            const newCompany = await companyRepository.createNewCompany(
                { descricao, cnpj, telefone, logradouro, cidade, ativo }
            );

            if (!newCompany) {
                return res.status(500).json({ message: 'Error while creating company' });
            }

            if (usuario) {
                const userRepository = UsuarioRepository;

                const userExists = await userRepository.getUser({id: usuario});

                if (!userExists) {
                    return res.status(500).json({ message: 'Error while adding user to company' });
                }

                userRepository.updateUser({ ...userExists, empresa: newCompany.id });
            }

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

    public updatedCompany = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const reqEmpresa = req.query.empresa;

        if (!reqEmpresa) {
            return res.status(400).json({message: 'Company not found'});
        }
        
        const empresaId = Number(req.params.id);

        if (!empresaId) {
            return res.status(400).json({message: 'Company not informed'});
        }

        const {
            descricao,
            cnpj,
            telefone,
            logradouro,
            cidade,
            ativo
        } = req.body;

        const companyToUpdate = await EmpresaRepository.getCompany({
            id: empresaId
        });

        if (!companyToUpdate) {
            return res.status(404).json({message: 'Company not found'});
        }


        
    }

}

export default new EmpresaController;