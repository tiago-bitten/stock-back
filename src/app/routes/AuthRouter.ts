import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/logout', authMiddleware(), AuthController.logout)
router.post('/auth', AuthController.authenticate)
router.post('/forgotPassword', AuthController.forgotPassword)
router.post('/resetPassword', AuthController.resetPassword)

export default router;