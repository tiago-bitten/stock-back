import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post('/auth', AuthController.authenticate)
router.post('/forgotPassword', AuthController.forgotPassword)
router.post('/resetPassword', AuthController.resetPassword)

export default router;