import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: [true, "Todo is required"],
        trim: true
    },
    desc: {
        type: String,
        trim: true
    },
    deadline: {
        type: Date,
        required: [true, "No tasks without a deadline"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
        default: null
    },
    editedAt: {
        type: Date,
        default: null
    }

});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;