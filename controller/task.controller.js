import mongoose from "mongoose";
import Task from "../models/task.model.js";

//create task api end point

export const CreateTask = async (req, res) => {
  try {
    const {sno, name, description, startDate, endDate, status } = req.body;

    if (!name && !description && !startDate && !endDate) {
      return res.status(404).json({ error: "All fields are required" });
    }

    const validTask = await Task.findOne({ sno:sno});

    if(validTask){
      return res.status(400).json({ message: "id already exists" });
    }


    const task = await Task.create({
      sno,
      name,
      description,
      startDate,
      endDate,
      status,
    });

    return res
      .status(200)
      .json({ task: task, message: "Task created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "some problems try agin later" });
  }
};

//get all task api end point

export const GetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) {
      return res.status(404).json({ error: "No tasks found" });
    }

    return res
      .status(200)
      .json({ message: "get all Task successful", tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error getting tasks" });
  }
};

//get single task api end point

export const GetSingleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "data fetched successfully", task });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error getting Task" });
  }
};

//update task api end point

export const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { sno,name, description, startDate, endDate, status } = req.body;

    if (!id) {
      return res.status(404).json({ error: "Task not found" });
    }


    const updateFields = {
      ...(sno && {sno}),
      ...(name && { name }),
      ...(description && { description }),
      ...( startDate && { startDate  }),
      ...( endDate  &&   { endDate }),
      ...(status && { status }),
    };

    const updateTask = await Task.findOneAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "employee updated successful", updateTask });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "update failed please try agin later" });
  }
};

//delete task api end point
// 
// export const DeleteTask = async (req, res) => {
  // try {
    // const { id } = req.params;
    // const deleteEmployee = await Task.deleteOne({ _id: id });
    // if (!deleteEmployee) {
      // return res.status(404).json({ error: "employee not found" });
    // }
// 
    // return res.status(200).json({ message: "employee deleted successful" });
  // } catch (error) {
    // console.log(error);
    // return res
      // .status(500)
      // .json({ message: "employee not deleted please try again later" });
      // 
  // }
// };
// 


export const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const deleteEmployee = await Task.deleteOne({ _id: id });
    if (!deleteEmployee) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Failed to delete task', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

