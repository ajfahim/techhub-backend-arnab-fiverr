import mongoose from "mongoose";


const teacherApplicationSchema = new mongoose.Schema({
  offerId: {
    type: String
  },
  schoolId: {
    type: String
  },
  teacherId: {
    type: String
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,

    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"], // Regex for basic email validation
  },
  contactNumber: {
    type: String,
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  },
  expectedSalary: {
    type: String,
  },
  currentCity: {
    type: String,
  },
  availableStartDate: {
    type: Date,
    required: false, // Optional based on your comment
  },

  summary: {
    type: String,
  },
  file: {
    type: String,
    required: false, // Changed to String to store the file path or URL
  },
  isSubscribed: {
    type: Boolean,
  },
});


const TeacherApplication = mongoose.model(
  "TeacherApplicationCollection",
  teacherApplicationSchema
);
export default TeacherApplication;


