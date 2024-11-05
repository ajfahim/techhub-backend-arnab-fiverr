import express from 'express';
import { apply, getapplicationBySchool, getApplications, myApplicationByTeacherId } from '../Controllers/teacherApplicationController.js';


const router = express.Router();
// get 
router.get("/getapplication", getApplications);
router.get("/getapplicationBySchool/:id", getapplicationBySchool);
router.get("/myApplications/:id", myApplicationByTeacherId);


// post 
router.post('/apply', apply);




export default router;