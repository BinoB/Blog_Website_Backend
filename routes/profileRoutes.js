import express from "express"

const router = express.Router();
import { editProfile, getProfile } from "../controllers/profileController.js";



router.get("/profile/:userId",getProfile);
router.put("/profile/:userId",editProfile);


export default router;