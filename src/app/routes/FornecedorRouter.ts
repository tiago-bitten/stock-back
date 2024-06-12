import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import FornecedorController from "../controllers/FornecedorController";

const router = Router();

router.get('/fornecedor', authMiddleware(), FornecedorController.getFornecedores);
router.post('/fornecedor', FornecedorController.storeFornecedor);

export default router;