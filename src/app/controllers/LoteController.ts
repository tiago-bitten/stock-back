import { Request, Response, NextFunction } from 'express';
import LoteRepository from '../repositories/LoteRepository';
import ILote from '../interfaces/ILote';
import moment from 'moment';

class LoteController {

    // #region === GET Routes ===

    /**
     * LISTAR LOTES QUE VENCERÃO EM UM PERÍODO ESPECÍFICO
     * 
     * @route GET /lote/vencimento/:periodo
     * @desc Lista todos os lotes que irão vencer em um período específico
     * @access Public
     * 
     */
    public getExpiringLotes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const empresa = Number(req.query.empresa);

            if (!empresa) {
                return res.status(400).json({ message: 'Company not founded' });
            }

            const periodo = Number(req.params.periodo);

            if (
                !periodo 
                || periodo < 1
            ) {
                return res.status(400).json({ message: 'Invalid period' });
            }

            const queryExpiringLotes = await LoteRepository.getExpiringLotes(empresa, periodo);

            if (!queryExpiringLotes) {
                return res.status(200).json({
                    message: 'No expiring batches found'
                });
            }

            const arrExpiringLotes: any = queryExpiringLotes
                .map(m => ({
                    id: m.id,
                    codigoBarras: m.codigoBarras,
                    dataFabricacao: m.dataFabricacao,
                    dataVencimento: m.dataVencimento,
                    produto: m.produto,
                    status: this.getLoteExpiringStatus(m.dataVencimento)
                }));

            return res.status(200).send({
                arrExpiringLotes
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    /**
     * LISTAR LOTES VENCIDOS
     * 
     * @route GET /lote/vencido
     * @desc Lista todos os lotes vencidos
     * @access Public
     * 
     */
    public getExpiredLotes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const empresa = Number(req.query.empresa);

            if (!empresa) {
                return res.status(400).json({ message: 'Company not founded' });
            }

            const queryExpiredLotes = await LoteRepository.getExpiredLotes(empresa);

            if (!queryExpiredLotes) {
                return res.status(200).json({
                    message: 'No expired batches found'
                });
            }

            const arrExpiredLotes: any = queryExpiredLotes
                .map(m => ({
                    id: m.id,
                    codigoBarras: m.codigoBarras,
                    dataFabricacao: m.dataFabricacao,
                    dataVencimento: m.dataVencimento,
                    produto: m.produto,
                    status: this.getLoteExpiringStatus(m.dataVencimento)
                }));
            
            return res.status(200).send({
                arrExpiredLotes
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    /**
     * BUSCAR LOTE
     * 
     * @route GET /lote/:id
     * @desc buscar um lote específico
     * @access Public
     * 
     */
    public getLote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const loteId = Number(req.params.id);

            if (!loteId) {
                return res.status(400).json({message: 'Lote not informed'});
            }

            const lote = await LoteRepository.getLote({
                empresa: reqEmpresa,
                id: loteId
            });

            if (!lote) {
                return res.status(404).json({ message: 'Lote not found' });
            }

            return res.status(200).send({
                lote
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    /**
     * LISTAR LOTES
     * 
     * @route GET /lote
     * @desc Lista todos os lotes
     * @access Public
     * 
     */
    public getLotes = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const params = {
                skip: req.query.skip ? Number(req.query.skip) : 0,
                produto: req.query.produto ? Number(req.query.produto) : undefined,
                codigoBarras: req.query.codigoBarras ? String(req.query.codigoBarras) : undefined,
                dataFabricacao: req.query.dataFabricacao ? moment(String(req.query.dataFabricacao)) : undefined,
                dataVencimento: req.query.dataVencimento ? moment(String(req.query.dataVencimento)) : undefined,
                observacao: req.query.observacao ? String(req.query.observacao) : undefined
            }

            const lotes = await LoteRepository.getLotes(
                {empresa: reqEmpresa, params}
            );

            return res.status(200).send({
                lotes
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    // #endregion

    // #region === POST Routes === 

    /**
     * CADASTRAR NOVO LOTE
     * 
     * @route POST /lote
     * @desc Cadastra um novo lote no sistema
     * @access Public
     * 
     */
    public storeLote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = req.query.empresa;

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const { codigoBarras, quantidade, observacoes, dataFabricacao, dataVencimento, produto, empresa } = req.body;

            if (!codigoBarras || !quantidade || !dataFabricacao || !dataVencimento || !produto || !empresa) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const loteToCreate: ILote = req.body;

            const newLote = await LoteRepository.createNewLote(loteToCreate);

            if (!newLote) {
                throw new Error('Error while creating lote');
            }

            return res.status(200).json({
                message: 'Lote created successfully',
                lote: newLote
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    // #endregion

    // #region === PUT Routes ===

    /**
     * ATUALIZAR LOTE
     * 
     * @route PUT /lote/:id
     * @desc Atualiza um lote no sistema
     * @access Public
     * 
     */
    public updateLote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }
            
            const loteId = Number(req.params.id);

            if (!loteId) {
                return res.status(400).json({message: 'Lote not informed'});
            }

            const { codigoBarras, quantidade, observacoes, dataFabricacao, dataVencimento, produto } = req.body;

            const loteToUpdate = await LoteRepository.getLote({
                empresa: reqEmpresa,
                id: loteId
            });

            if (!loteToUpdate) {
                return res.status(404).json({ message: 'Lote not found' });
            }

            (typeof quantidade !== 'undefined') ? loteToUpdate.quantidade = quantidade : null;
            (typeof dataFabricacao !== 'undefined') ? loteToUpdate.dataFabricacao = dataFabricacao : null;
            (typeof dataVencimento !== 'undefined') ? loteToUpdate.dataVencimento = dataVencimento : null;
            (typeof produto !== 'undefined') ? loteToUpdate.produto = produto : null;
            (typeof codigoBarras !== 'undefined') ? loteToUpdate.codigoBarras = codigoBarras : null;

            const updatedLote = await LoteRepository.updateLote(loteToUpdate);

            if (!updatedLote) {
                return res.status(500).json({ message: 'Error while updating lote' });
            }

            return res.status(200).json({
                message: 'Lote updated successfully',
                lote: updatedLote
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    // #endregion

    // #region === DELETE Routes ===

    /**
     * DELETAR LOTE
     * 
     * @route DELETE /lote/:id
     * @desc Deleta um lote do sistema
     * @access Public
     * 
     */
    public deleteLote = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const reqEmpresa = Number(req.query.empresa);

            if (!reqEmpresa) {
                return res.status(400).json({message: 'Company not found'});
            }

            const loteId = Number(req.params.id);

            if (!loteId) {
                return res.status(400).json({message: 'Lote not informed'});
            }

            const deletedLote = await LoteRepository.deleteLote(loteId);

            if (!deletedLote) {
                return res.status(500).json({ message: 'Error while deleting lote' });
            }

            return res.status(200).json({
                message: 'Lote deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: error
            });
        }
    }

    // #endregion

    // #region === Utils ===

    /**
     * VERIFICAR STATUS DE VALIDADE DO LOTE
     * 
     * @param dataVencimento 
     * @return string
     */
    private getLoteExpiringStatus = (dataVencimento: Date): string => {
        const now = moment();

        if (moment(dataVencimento).isBefore(now)) {
            return 'expired';
        }

        if ( moment(dataVencimento).isSame(now)) {
            return 'expiring';
        }

        return 'valid';
    }

    // #endregion

}

export default new LoteController;