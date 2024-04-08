import { Router } from "express";
import AuthController from "./AuthController";

const router = Router();

router.use('/auth', AuthController.authenticate)

export default router;