import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import EstoqueController from "../controllers/EstoqueController";

const router = Router();

router.get('/estoque', authMiddleware(), EstoqueController.getEstoques);
router.post('/estoque', EstoqueController.storeEstoque);

export default router;