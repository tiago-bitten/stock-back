import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/categoria/:id', authMiddleware(), CategoriaController.getCategory);
router.get('/categoria', authMiddleware(), CategoriaController.getCategories);

router.post('/categoria', CategoriaController.storeCategory);

router.put('/categoria/:id', authMiddleware(), CategoriaController.updateCategory);

router.delete('/categoria/:id', authMiddleware(), CategoriaController.deleteCategory);

export default router;