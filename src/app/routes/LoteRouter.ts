import { Router } from "express";
import LoteController from "../controllers/LoteController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/lote/vencimento/:periodo', authMiddleware(), LoteController.getExpiringLotes);
router.get('/lote/vencido', authMiddleware(), LoteController.getExpiredLotes);
router.get('/lote', authMiddleware(), LoteController.getLotes);
router.post('/lote', LoteController.storeLote);

export default router;