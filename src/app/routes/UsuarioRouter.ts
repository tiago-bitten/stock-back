import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/usuario/:id', authMiddleware(), UsuarioController.getUser);
router.get('/usuario', authMiddleware(), UsuarioController.getUsers);

router.post('/usuario', UsuarioController.storeUser);

router.put('/usuario/:id', authMiddleware(), UsuarioController.updateUser);

router.delete('/usuario/:id', authMiddleware(), UsuarioController.deleteUser);

export default router;