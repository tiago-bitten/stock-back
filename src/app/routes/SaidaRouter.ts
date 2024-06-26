import { Router } from "express";
import SaidaController from "../controllers/SaidaController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/saida/:id', authMiddleware(), SaidaController.getSaida);
router.get('/saida', authMiddleware(), SaidaController.getSaidas);

router.post('/saida', authMiddleware(), SaidaController.storeSaida);

router.put('/saida/:id', authMiddleware(), SaidaController.updateSaida);

router.delete('/saida/:id', authMiddleware(), SaidaController.deleteSaida);

export default router;