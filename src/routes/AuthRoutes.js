import { celebrate } from "celebrate";
import { Router } from "express";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";

const router = Router();

// {AUTH} // 
router.post("/auth/register", celebrate(registerSchema), registerUser);

router.post("/auth/login", celebrate(loginSchema), loginUser);

router.post("/auth/logout", logoutUser);

router.get("/auth/me", () => {});

export default router;
