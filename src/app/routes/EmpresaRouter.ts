import { Router } from "express";
import EmpresaController from "../controllers/EmpresaController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/empresa', authMiddleware(), EmpresaController.getCompanies);
router.post('/empresa', EmpresaController.storeCompany);

export default router;