
import { Router } from "express";
const router = Router()
import authControllers from "../controllers/auth.controllers";
import authMiddleware from '../middleware/auth.middleware'

//Admin autorization
router.post("/register", authControllers.registration);
router.post("/login", authControllers.login);
router.get("/check", authMiddleware, authControllers.check);

export default router;
