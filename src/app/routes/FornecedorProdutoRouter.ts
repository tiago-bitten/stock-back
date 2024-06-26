import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import FornecedorProdutoController from "../controllers/FornecedorProdutoController";

const router = Router();

router.get('/fornecedorProduto/:id', authMiddleware(), FornecedorProdutoController.getFornecedorProduto);
router.get('/fornecedorProduto', authMiddleware(), FornecedorProdutoController.getFornecedorProdutos);

router.post('/fornecedorProduto', authMiddleware(), FornecedorProdutoController.storeFornecedorProduto);

router.put('/fornecedorProduto/:id', authMiddleware(), FornecedorProdutoController.updateFornecedorProduto);

router.delete('/fornecedorProduto/:id', authMiddleware(), FornecedorProdutoController.deleteFornecedorProduto);

export default router;