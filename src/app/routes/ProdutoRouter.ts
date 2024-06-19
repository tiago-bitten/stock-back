import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/produto/:id', authMiddleware(), ProdutoController.getProduct);
router.get('/produto', authMiddleware(), ProdutoController.getProducts);

router.post('/produto', ProdutoController.storeProduct);

router.put('/produto/:id', ProdutoController.updateProduct);

router.delete('/produto/:id', ProdutoController.deleteProduct);

export default router;