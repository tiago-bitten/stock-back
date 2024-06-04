import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import CargoController from "../controllers/CargoController";

const router = Router();

router.get('/cargo', authMiddleware(), CargoController.getCargos);
router.post('/cargo', CargoController.storeCargo);

export default router;