import express from "express";
import { getAllUser, signIn, signUp } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
