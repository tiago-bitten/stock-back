import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import EstoqueController from "../controllers/EstoqueController";

const router = Router();

router.get('/estoque/:id', authMiddleware(), EstoqueController.getEstoque);
router.get('/estoque', authMiddleware(), EstoqueController.getEstoques);

router.post('/estoque', EstoqueController.storeEstoque);

router.put('/estoque/:id', EstoqueController.updateEstoque);

router.delete('/estoque/:id', EstoqueController.deleteEstoque);

export default router;