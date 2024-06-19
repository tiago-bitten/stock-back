import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import FornecedorController from "../controllers/FornecedorController";

const router = Router();

router.get('/fornecedor/:id', authMiddleware(), FornecedorController.getFornecedor);
router.get('/fornecedor', authMiddleware(), FornecedorController.getFornecedores);

router.post('/fornecedor', FornecedorController.storeFornecedor);

router.put('/fornecedor/:id', FornecedorController.updateFornecedor);

router.delete('/fornecedor/:id', FornecedorController.deleteFornecedor);

export default router;