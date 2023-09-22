import { getSayings, createSaying, updateSaying, deleteSaying } from "../controllers/sayings.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";

export const router  = express.Router();

router.get("/:tag?/:sort?", getSayings); 

router.delete('/:id', verifyToken, deleteSaying);

router.put("/:id", verifyToken, updateSaying);

router.post("/", verifyToken, createSaying);

export default router;