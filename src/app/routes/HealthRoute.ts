import { Router } from "express";
import HealthController from "../controllers/HealthController";

const router = Router();

router.get('/check', HealthController.check)

export default router;