import Message from "../Models/messageModel.js";
import mongoose from "mongoose";

export const getMessage = async (req, res) => {
    const { userId, contactId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: contactId },
                { senderId: contactId, receiverId: userId },
            ],
        }).sort({ timestamp: 1 }); // Sort messages by timestamp
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch messages" });
    }
};

export const saveMessage = async (req, res) => {
    const { senderId, receiverId, text } = req.body;

    try {
        const message = new Message({ senderId, receiverId, text });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Failed to save message" });
    }
};


export const getLastMessage = async (req, res) => {
    const { userId, contactId } = req.params;

    try {
        // Find the most recent message between the two users, sorted by timestamp
        const lastMessage = await Message.findOne({
            $or: [
                { senderId: userId, receiverId: contactId },
                { senderId: contactId, receiverId: userId },
            ],
        })
            .sort({ timestamp: -1 })
            .exec();

        if (lastMessage) {
            res.status(200).json(lastMessage);
        } else {
            res.status(404).json({ message: "No messages found between users" });
        }
    } catch (error) {
        console.error("Error fetching the last message:", error);
        res.status(500).json({ error: "Server error" });
    }
};