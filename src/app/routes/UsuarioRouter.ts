import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/user', authMiddleware, UsuarioController.getUsers);
router.post('/user', UsuarioController.storeUser);

export default router;