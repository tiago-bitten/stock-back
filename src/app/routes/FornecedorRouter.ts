import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import FornecedorController from "../controllers/FornecedorController";

const router = Router();

router.get('/fornecedor/:id', authMiddleware(), FornecedorController.getFornecedor);
router.get('/fornecedor', authMiddleware(), FornecedorController.getFornecedores);

router.post('/fornecedor', authMiddleware(), FornecedorController.storeFornecedor);

router.put('/fornecedor/:id', authMiddleware(), FornecedorController.updateFornecedor);

router.delete('/fornecedor/:id', authMiddleware(), FornecedorController.deleteFornecedor);

export default router;