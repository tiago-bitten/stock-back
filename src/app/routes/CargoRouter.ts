import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import CargoController from "../controllers/CargoController";

const router = Router();

router.get('/cargo/:id', authMiddleware(), CargoController.getCargo);
router.get('/cargo', authMiddleware(), CargoController.getCargos);

router.post('/cargo', authMiddleware(), CargoController.storeCargo);

router.put('/cargo/:id', authMiddleware(), CargoController.updateCargo);

router.delete('/cargo/:id', authMiddleware(), CargoController.deleteCargo);

export default router;