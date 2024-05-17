import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/categoria', authMiddleware(), CategoriaController.getCategories);
router.post('/categoria', CategoriaController.storeCategory);

export default router;