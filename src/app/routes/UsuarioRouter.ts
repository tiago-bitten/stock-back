import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/usuario', authMiddleware(), UsuarioController.getUsers);
router.post('/usuario', UsuarioController.storeUser);

export default router;