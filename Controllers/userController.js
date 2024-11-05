import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { sendOtpForForgotPassword, sendOtpForRegistration, sendWelcomeEmail } from '../MailServices/mail.js';
import bcrypt from 'bcrypt'

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


export const singupUser = async (req, res) => {
    // console.log("AOAOAO",req.body)
    console.log("AP=>", req.body)
    const { firstname, lastname, email, password, role } = req.body;
    const isverified = false;
    try {
        const user = await userModel.signup(firstname, lastname, email, password, role, isverified);

        const token = createToken(user._id);

        await sendWelcomeEmail(email, firstname)

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllUser = async (req, res) => {
    const users = await userModel.find({});
    res.status(200).json(users);
};


export const signupOTP = async (req, res) => {
    const mail = await sendOtpForRegistration(req.body.email, req.body.otp);
    res.status(200).json(mail);
};
export const forgotPasswordOTP = async (req, res) => {
    const mail = await sendOtpForForgotPassword(req.body.email, req.body.otp);
    res.status(200).json(mail);
};


export const getSchools = async (req, res) => {
    const users = await userModel.find({ role: "school-owner" });
    res.status(200).json(users);
};
export const getSchoolById = async (req, res) => {
    const { id } = req.params;
    const users = await userModel.findById(id);
    res.status(200).json(users);
};
export const getSpeakers = async (req, res) => {
    const { id } = req.params;
    const users = await userModel.findById(id);
    console.log("Here ", users)
    let speakers = [];
    for (let i = 0; i < users.speakers.length; i++) {
        let thiso = await userModel.findById(users.speakers[i]);
        speakers.push(thiso);
    }
    return res.status(200).json(speakers);
};
export const getAllSpeakers = async (req, res) => {
    const users = await userModel.find({role:'teacher'});
    return res.status(200).json(users);
};

export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const user = await userModel.findById(id);

    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such user Found.!." });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID." });
    }

    try {
        // Find the existing user
        const prevUser = await userModel.findById(id);
        console.log("🚀 ~ updateUser ~ prevUser:", prevUser);

        if (!prevUser) {
            return res.status(404).json({ error: "No Such User Found." });
        }

        // Check if the email is being updated
        if (req.body.email && req.body.email !== prevUser.email) {
            // Check if the new email is not empty
            if (req.body.email === "") {
                return res.status(400).json({ error: "Email cannot be empty." });
            }

            // Check if the new email already exists
            const existingUser = await userModel.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use." });
            }
        }

        // Update the user
        const updatedUser = await userModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            return res.status(400).json({ error: "Failed to update user." });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "An error occurred while updating the user." });
    }
};

export const changePasswordFromForgotPassword = async (req, res) => {

    console.log("AAAAAAA",req.body);
    const { email } = req.params;
    const exist = await userModel.findOne({ email });



    if (!exist) {
        return res.status(404).json({ error: "Could Not Find any User with This Email.!. Please Sign Up" });
    }

    let dex = exist;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    dex.password=hash;

    const user = await userModel.findOneAndUpdate({ email: email }, {
        ...dex
    });

    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};

export const editProfessionalCareer = async (req, res) => {

    const { id } = req.params;
    console.log("AAAAA", req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const prevUser = await userModel.findById(id);
    let dex = prevUser;
    dex.schoolName = req.body.professionalCareer;

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        ...dex
    });
    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};

export const editSkills = async (req, res) => {
    const { id } = req.params;
    console.log("AAAAA", req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const prevUser = await userModel.findById(id);
    let dex = prevUser;
    dex.schoolName = req.body.skills;

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        ...dex
    });
    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};

export const editStudentPlan = async (req, res) => {
    const { id } = req.params;
    console.log("AAAAA", req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const prevUser = await userModel.findById(id);
    let dex = prevUser;
    dex.schoolName = req.body.studentPlan;

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        ...dex
    });
    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};

export const updateTeacherProfile = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const prevUser = await userModel.findById(id);
    let dex = prevUser;

    dex.schoolName = req.body.schoolName;
    dex.facilityName = req.body.facilityName;
    dex.address = req.body.address;
    dex.establishmentType = req.body.establishmentType;
    dex.contactPerson = req.body.contactPerson;
    dex.teachingArea = req.body.teachingArea;
    dex.presentation = req.body.presentation;
    dex.solicitedApp = req.body.solicitedApp;
    dex.acceptRemindersAfter = req.body.acceptRemindersAfter;
    dex.unsolicitedApp = req.body.unsolicitedApp;
    dex.recipients = req.body.recipients;

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        ...dex
    });

    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};

export const editEstablishment = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const prevUser = await userModel.findById(id);
    let dex = prevUser;

    dex.schoolName = req.body.schoolName;
    dex.facilityName = req.body.facilityName;
    dex.address = req.body.address;
    dex.establishmentType = req.body.establishmentType;
    dex.contactPerson = req.body.contactPerson;
    dex.teachingArea = req.body.teachingArea;
    dex.presentation = req.body.presentation;
    dex.solicitedApp = req.body.solicitedApp;
    dex.acceptRemindersAfter = req.body.acceptRemindersAfter;
    dex.unsolicitedApp = req.body.unsolicitedApp;
    dex.recipients = req.body.recipients;

    const user = await userModel.findOneAndUpdate({ _id: id }, {
        ...dex
    });

    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const user = await userModel.findOneAndDelete({ _id: id }, {
        ...req.body
    });

    if (user) {
        res.status(200).json(user);
    } else {
        return res.status(400).json({ error: "No Such User Found.!." });
    }
};
