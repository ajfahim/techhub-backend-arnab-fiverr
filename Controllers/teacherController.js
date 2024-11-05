import teacherModel from '../models/teacherModel.js';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { teacherRegistrationEmail } from './mailController.js';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

export const createTeacher = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = Date.now().toString();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const title = req.body.title;
    const bio = req.body.bio;
    const hourlyrate = req.body.hourlyrate;
    const availability = req.body.availability;

    const exist = await teacherModel.findOne({ email });

    if (exist) {
        return res.status(400).json({ error: "Already a Teacher exists with this Email.!." });
    }

    const asTeacher = {
        firstname,
        lastname,
        email,
        password:hash,
        title,
        bio,
        hourlyrate,
        availability
    };

    const newTeacher = new teacherModel(asTeacher);
    const savedTeacher = await newTeacher.save();


    const userExist = await userModel.findOne({ email });

    if (userExist) {
        const updatedUser = {
            firstname:userExist.firstname,
            lastname:userExist.lastname,
            email:userExist.email,
            password:userExist.password,
            role: "teacher",
            isverified:userExist.isverified,
            teacherid:savedTeacher._id,
        };

        const teacher = await userModel.findOneAndUpdate({ email: email }, updatedUser);

        await teacherRegistrationEmail(email,updatedUser.firstname,updatedUser.password)

        res.status(200).json(teacher);
        return;
    }


    const asUser = {
        firstname,
        lastname,
        email,
        password:hash,
        role: "teacher",
        isverified: false,
        teacherid: savedTeacher._id
    };

    const newUser = new userModel(asUser);
    const savedUser = await newUser.save();

    await teacherRegistrationEmail(savedUser.email,savedUser.firstname,password)


    res.status(200).json(savedTeacher);
    return;
}


export const getAllTeacher = async (req, res) => {
    const teachers = await teacherModel.find({});
    res.status(200).json(teachers);
};

export const getSingleTeacher = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const teacher = await teacherModel.findById(id);

    if (teacher) {
        res.status(200).json(teacher);
    } else {
        return res.status(400).json({ error: "No Such teacher Found.!." });
    }
};

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const teacher = await teacherModel.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (teacher) {
        res.status(200).json(teacher);
    } else {
        return res.status(400).json({ error: "No Such Teacher Found.!." });
    }
};

export const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const teacher = await teacherModel.findOneAndDelete({ _id: id }, {
        ...req.body
    });

    if (teacher) {
        res.status(200).json(teacher);
    } else {
        return res.status(400).json({ error: "No Such Teacher Found.!." });
    }
};