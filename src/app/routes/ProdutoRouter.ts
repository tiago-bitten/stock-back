import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/produto', authMiddleware(), ProdutoController.getProducts);
router.post('/produto', ProdutoController.storeProduct);

export default router;