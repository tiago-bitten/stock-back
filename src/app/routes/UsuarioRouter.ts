import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/authMiddleware";
import permissionsMiddleware from "../middlewares/permissionsMiddleware";

const router = Router();

router.get('/usuario', authMiddleware(), permissionsMiddleware(), UsuarioController.getUsers);
router.post('/usuario', UsuarioController.storeUser);

export default router;