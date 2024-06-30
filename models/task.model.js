import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

        sno: {type: Number,required: true},
    
        name: {type: String,required: true},

        description: {type: String,required: true},

        startDate: {type: Date,required: true},

        endDate: {type: Date, required: true},

        status: {type: Boolean},
    
}, {versionKey:false, timestamps: true})

const Task = mongoose.model('Employee',  TaskSchema);

export default Task;