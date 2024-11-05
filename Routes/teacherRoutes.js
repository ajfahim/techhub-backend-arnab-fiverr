import express from 'express';
import { createTeacher, deleteTeacher, getAllTeacher, getSingleTeacher, updateTeacher } from '../Controllers/teacherController.js';

const router = express.Router();

router.post('/create',createTeacher)
router.get('/getTeacher/:id',getSingleTeacher)
router.get('/getTeacher',getAllTeacher)
router.patch('/updateTeacher/:id',updateTeacher)
router.delete('/deleteTeacher/:id',deleteTeacher)

export default router;