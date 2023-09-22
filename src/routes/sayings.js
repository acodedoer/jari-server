import { getSayings, createSaying, updateSaying, deleteSaying } from "../controllers/sayings.js";
import express from "express";

export const router  = express.Router();

router.get("/:tag?/:sort?", getSayings); 

router.delete('/:id', deleteSaying);

router.put("/:id", updateSaying);

router.post("/", createSaying);

export default router;