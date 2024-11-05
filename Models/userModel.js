import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator';


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    availableDate: [String],
    availableInWeek: [String],
    availableInDay: [String],
    minWeeklyHours: {
        type: Number,
    },
    maxWeeklyHours: {
        type: Number,
    },
    timeOfDay: {
        type: String,
    },
    timeOfRange: {
        type: String,
    },
    workPreference: {
        type: String,
    },
    selectCity : {
        type: String,
    },
    otherLocation : {
        type: String,
    },
    subjectGradeLevel: {
        type: String,
    },
    teachingExperience: {
        type: Number,
    },
    skills: [String],
    notes: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyType: {
        type: String,
    },
    chargePermission: {
        type: Boolean,
    },
    professionalCareer: {
        type: String,
    },
    studentPlan: {
        type: String,
    },
    interestedBy: [String],
    permanentContract: {
        type: Boolean,
    },
    motivations: [String],
    publicSpeaking: {
        type: Boolean,
    },
    secondarySchoolCourses: {
        type: Boolean,
    },
    higherEducationCourses: {
        type: Boolean,
    },
    establishment: {
        type: String,
    },
    higherEducaitonConference: {
        type: Boolean,
    },
    companyTraining: {
        type: Boolean,
    },
    corporateConference: {
        type: Boolean,
    },
    bts: {
        type: Boolean,
    },
    modules: {
        type: String,
    },
    privateLessons: {
        type: Boolean,
    },
    diplomas: [String],
    certifications: [String],
    languages: [String],
    computerLanguages: {
        type: String,
    },
    establishmentGroups: [String],
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    isverified: {
        type: Boolean
    },
    teacherid: {
        type: String
    },


    //this is for school establishment
    schoolName: {
        type: String
    },
    facilityName: {
        type: String,
    },
    address: {
        type: String,
    },
    establishmentType: {
        type: String,
    },
    contactPerson: {
        type: String,
    },
    teachingArea: [String],
    presentation: {
        type: String,
    },
    solicitedApp: {
        type: String,
    },
    acceptRemindersAfter: {
        type: String,
    },
    unsolicitedApp: {
        type: String,
    },
    recipients: {
        type: String
    },
    speakers:[String],
}, { timestamps: true });

userSchema.statics.signup = async function (firstname, lastname, email, password, role, isverified) {
    const exist = await this.findOne({ email });



    if (exist) {
        if (!password)
            return exist;
        throw Error("Email already exists.!.");
    }

    if (!email || !firstname) {
        throw Error("All fields must be filled...");
    }

    if (!validator.isEmail(email)) {
        throw Error("Not a valid email.!.")
    }
    if (password && !validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough.!.")
    }

    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ firstname, lastname, email, password: hash, role, isverified });

        return user;
    }

    else {
        const user = await this.create({ firstname, lastname, email, role, isverified });
        return user;
    }
};


userSchema.statics.login = async function (email, password) {

    if (password) {
        if (!password || !email) {
            throw Error("All fields must be filled...");
        }

        const user = await this.findOne({ email });

        if (!user) {
            throw Error("Incorrect Email.!.");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error("Incorrect password.!.");
        }

        return user;
    }
    else {
        if (!email) {
            throw Error("All fields must be filled...");
        }

        const user = await this.findOne({ email });

        if (!user) {
            throw Error("Incorrect Email.!.");
        }

        return user;
    }

};

const user = mongoose.model("UserCollection", userSchema);

export default user;
