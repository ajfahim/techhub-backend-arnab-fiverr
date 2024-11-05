import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator';


const teacherSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    hourlyrate: {
        type: Number
    },
    availability: [
        {
            day: String,
            range: String
        }
    ]
}, { timestamps: true });



const teacher = mongoose.model("TeacherCollection", teacherSchema);

export default teacher;
