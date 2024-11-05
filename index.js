import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import { Server } from "socket.io";
import http from "http";

// application routes imports
import userRoutes from './Routes/userRoutes.js';
import teacherRoutes from './Routes/teacherRoutes.js';
import offerRoutes from './Routes/offerRoutes.js';
import applicationRoutes from './Routes/applicationRoutes.js';
import messageRoutes from './Routes/messageRoutes.js';
import Message from "./Models/messageModel.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // React frontend URL
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/user", userRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/offer", offerRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Successfully Connected to DB");
        server.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("send_message", async (data) => {
        const { senderId, receiverId, text } = data;

        try {
            const message = new Message({ senderId, receiverId, text });
            await message.save();  // Save the message to MongoDB
            io.emit("receive_message", message); // Broadcast the saved message
        } catch (error) {
            console.log("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
