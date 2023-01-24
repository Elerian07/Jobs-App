import { Router } from "express";
import * as authControl from './controller/auth.controller.js';
const router = Router()

router.post("/register", authControl.register)
router.post("/login", authControl.login)
router.get("/confirmEmail/:token", authControl.confirmEmail)
router.get("/refreshToken/:token", authControl.refresh)

export default router