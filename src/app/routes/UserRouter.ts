import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";

const router = Router();

router.get('/user', UsuarioController.getUsuarios);
// router.post('/user', UsuarioController.postUsuario);
// router.get('/user/:id', UsuarioController.getUsuario);
// router.put('/user/:id', UsuarioController.updateUsuario);
// router.delete('/user/:id', UsuarioController.deleteUsuario);

export default router;