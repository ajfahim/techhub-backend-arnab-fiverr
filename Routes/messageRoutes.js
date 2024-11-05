import express from "express";
import { getLastMessage, getMessage, saveMessage } from "../Controllers/messageController.js";

const router = express.Router();

// Route to get messages between two users
router.get("/:userId/:contactId", getMessage);
// Route to get the last message between two users
router.get("/last/:userId/:contactId", getLastMessage);

// Route to save a new message
router.post("/", saveMessage);

export default router;
