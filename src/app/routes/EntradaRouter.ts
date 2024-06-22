import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import EntradaController from "../controllers/EntradaController";

const router = Router();

router.get('/entrada/:id', authMiddleware(), EntradaController.getEntrada);
router.get('/entrada', authMiddleware(), EntradaController.getEntradas);

router.post('/entrada', authMiddleware(), EntradaController.storeEntrada);

router.put('/entrada/:id', authMiddleware(), EntradaController.updateEntrada);

router.delete('/entrada/:id', authMiddleware(), EntradaController.deleteEntrada);

export default router;