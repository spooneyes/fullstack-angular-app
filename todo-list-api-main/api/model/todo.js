const mongoose = require('mongoose');
const { Types } = mongoose;
const { ObjectId } = Types;

const TodoSchema = new mongoose.Schema({
    creator: { type: ObjectId, ref: 'User', required: true },
    assigned: [{ type: ObjectId, ref: 'User', required: true }],
    title: { type: String, required: false },
    content: { type: String, required: true },
    completionDate: { type: Date, required: false },
},  { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema, 'todos');
