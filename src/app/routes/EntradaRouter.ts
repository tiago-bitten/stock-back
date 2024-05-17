import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import EntradaController from "../controllers/EntradaController";

const router = Router();

router.get('/entrada', authMiddleware(), EntradaController.getEntradas);
router.post('/entrada', EntradaController.storeEntrada);

export default router;