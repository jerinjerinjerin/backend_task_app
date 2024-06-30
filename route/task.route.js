import express from 'express';
import { 
    CreateTask,
    DeleteTask,
    GetAllTasks,
    GetSingleTask,
    UpdateTask, 
} from '../controller/task.controller.js';

const router = express.Router();


router.post('/create-task', CreateTask);

router.get('/get-all-tasks', GetAllTasks);

router.get('/get-single-task/:id', GetSingleTask);

router.put('/update-task/:id', UpdateTask);

router.delete('/delete-task/:id', DeleteTask);



export default router;