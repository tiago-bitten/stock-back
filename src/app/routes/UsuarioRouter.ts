import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();

router.get('/user', UsuarioController.getUsers);
router.post('/user', UsuarioController.storeUser);
// router.get('/user/:id', UserController.getUser);
// router.put('/user/:id', UserController.updateUser);
// router.delete('/user/:id', UserController.deleteUser);

export default router;