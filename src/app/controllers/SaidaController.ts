import { Request, Response, NextFunction } from 'express';
import SaidaRepository from '../repositories/SaidaRepository';
import ISaida from '../interfaces/ISaida';
import LoteRepository from '../repositories/LoteRepository';
import ProdutoRepository from '../repositories/ProdutoRepository';
import FornecedorRepository from '../repositories/FornecedorRepository';

class SaidaController {
    public getTotalSaidas = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const dataInicial = new Date(String(req.query.dataInicial));
            const dataFinal = new Date(String(req.query.dataFinal));
            const limit = Number(req.query.limit);

            if (!dataInicial || !dataFinal || !limit) {
                return res.status(400).json({message: 'Missing required fields'});
            }

            if (dataInicial > dataFinal) {
                return res.status(400).json({message: 'Data Inicial must be less than Data Final'});
            }

            if (limit < 1) {
                return res.status(400).json({message: 'Limit must be greater than 0'});
            }

            const totalSaidas = await SaidaRepository.getTotalSaidas({
                empresa: reqEmpresa,
                params: {
                    dataInicial,
                    dataFinal,
                    limit
                }
            });

            if (!totalSaidas) {
                return res.status(404).json({ message: 'Total Saidas not found' });
            }

            return res.status(200).send({
                totalSaidas
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    };

    public getSaida = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const saidaId = Number(req.params.id);

            if (!saidaId) {
                return res.status(400).json({message: 'Saida not informed'});
            }

            const saida = await SaidaRepository.getSaida({
                empresa: reqEmpresa,
                id: saidaId
            });

            if (!saida) {
                return res.status(404).json({ message: 'Saida not found' });
            }

            return res.status(200).send({
                saida
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public getSaidas = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0,
                lote: req.query.lote ? Number(req.query.lote) : undefined,
                quantidade: req.query.quantidade ? Number(req.query.quantidade) : undefined,
                produto: req.query.produto ? Number(req.query.produto) : undefined,
                fornecedor: req.query.fornecedor ? Number(req.query.fornecedor) : undefined
            }

            const saidas = await SaidaRepository.getSaidas({
                empresa: reqEmpresa,
                params
            });

            if (!saidas) {
                return res.status(404).json({ message: 'Saidas not found' });
            }

            return res.status(200).send({
                saidas
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public storeSaida = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { lote, quantidade, produto, fornecedor } = req.body;

            if (!lote || !quantidade || !produto || !fornecedor) {
                return res.status(400).json({message: 'Missing required fields'});
            }

            const loteExists = await LoteRepository.getLote({
                id: lote,
                empresa: reqEmpresa
            });

            if (!loteExists) {
                return res.status(400).json({message: 'Lote not found'});
            }

            const fornecedorExists = await FornecedorRepository.getFornecedor({
                id: fornecedor,
                empresa: reqEmpresa
            });

            if (!fornecedorExists) {
                return res.status(400).json({message: 'Fornecedor not found'});
            }

            const produtoExists = await ProdutoRepository.getProduct({
                id: produto,
                empresa: reqEmpresa
            });

            if (!produtoExists) {
                return res.status(400).json({message: 'Produto not found'});
            }

            const saidaToCreate: ISaida = {
                empresa: reqEmpresa,
                lote,
                quantidade,
                produto,
                fornecedor
            };

            const newSaida = await SaidaRepository.createNewSaida(saidaToCreate);

            if (!newSaida) {
                return res.status(400).json({message: 'Error creating Saida'});
            }

            return res.status(200).send({
                message: 'Saida created successfully',
                saida: newSaida
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public updateSaida = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const saidaId = Number(req.params.id);

            if (!saidaId) {
                return res.status(400).json({message: 'Saida not informed'});
            }

            const { lote, quantidade, produto, fornecedor } = req.body;

            const saidaToUpdate = await SaidaRepository.getSaida({
                empresa: reqEmpresa,
                id: saidaId
            });

            if (!saidaToUpdate) {
                return res.status(404).json({message: 'Saida not found'});
            }

            (typeof quantidade !== 'undefined') ? saidaToUpdate.quantidade = quantidade : null;

            if (typeof lote !== 'undefined') {

                const loteExists = await LoteRepository.getLote({
                    id: lote,
                    empresa: reqEmpresa
                });
    
                if (!loteExists) {
                    return res.status(400).json({message: 'Lote not found'});
                }
    
                saidaToUpdate.lote = lote;
            }

            if (typeof fornecedor !== 'undefined') {
                const fornecedorExists = await FornecedorRepository.getFornecedor({
                    id: fornecedor,
                    empresa: reqEmpresa
                });
    
                if (!fornecedorExists) {
                    return res.status(400).json({message: 'Fornecedor not found'});
                }

                saidaToUpdate.fornecedor = fornecedor;
            }

            if (typeof produto !== 'undefined') {

                const produtoExists = await ProdutoRepository.getProduct({
                    id: produto,
                    empresa: reqEmpresa
                });
    
                if (!produtoExists) {
                    return res.status(400).json({message: 'Produto not found'});
                }

                saidaToUpdate.produto = produto;
            }

            const updatedSaida = await SaidaRepository.updateSaida(saidaToUpdate);

            if (!updatedSaida) {
                return res.status(400).json({message: 'Error updating Saida'});
            }

            return res.status(200).send({
                message: 'Saida updated successfully',
                saida: updatedSaida
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }

    public deleteSaida = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const saidaId = Number(req.params.id);

            if (!saidaId) {
                return res.status(400).json({message: 'Saida not informed'});
            }

            const deletedSaida = await SaidaRepository.deleteSaida(saidaId);

            if (!deletedSaida) {
                return res.status(400).json({message: 'Error deleting Saida'});
            }

            return res.status(200).send({
                message: 'Saida deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        }
    }
}

export default new SaidaController;