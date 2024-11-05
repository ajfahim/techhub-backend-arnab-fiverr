import express from 'express';
import { changePasswordFromForgotPassword, deleteUser, editEstablishment, editProfessionalCareer, editSkills, editStudentPlan, forgotPasswordOTP, getAllSpeakers, getAllUser, getSchoolById, getSchools, getSingleUser, getSpeakers, loginUser, signupOTP, singupUser, updateUser } from '../Controllers/userController.js';



const router = express.Router();

// get
router.get('/getUser/:id',getSingleUser)
router.get('/getUser',getAllUser)
router.get('/getSchools',getSchools)
router.get('/getSchools/:id',getSchoolById)
router.get('/getSpeakers/:id',getSpeakers)
router.get('/getAllSpeakers/',getAllSpeakers)


// post
router.post('/login',loginUser)
router.post('/signup',singupUser)
router.post('/signupOTP',signupOTP)
router.post('/forgotPassword/OTP',forgotPasswordOTP)


// patch
router.patch('/updateUser/:id',updateUser)
router.patch('/editSkills/:id',editSkills)
router.patch('/editStudentPlan/:id',editStudentPlan)
router.patch('/editEstablishment/:id',editEstablishment)
router.patch('/editProfessionalCareer/:id',editProfessionalCareer)
router.patch('/changePassword/:email',changePasswordFromForgotPassword)


// delete
router.delete('/deleteUser/:id',deleteUser)



export default router;