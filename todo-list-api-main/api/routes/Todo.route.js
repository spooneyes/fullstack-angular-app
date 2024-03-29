const express = require('express');
const auth = require('../middleware/auth');
const { Todo } = require('../model');
const router = express.Router();

router.post('/', auth, async (req, res) => {
     if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request body cannot be empty');
    }
    
    try {
        await Todo.create({
            creator: req.ctx.user_id,
            ...req.body,
        });
    } catch (error) {
        console.log(error)
    }
    res.sendStatus(200);
});

router.delete('/:id/', auth, async (req, res) => {
    const { id: todoID } = req.params;
    const todo = await Todo.findById(todoID);
    if (!todo)
      return res.sendStatus(404);
    if (todo.creator != req.ctx.user_id)
      return res.sendStatus(403);
    await todo.deleteOne();
    console.log("Todo", todo, "deleted")
    res.sendStatus(200);
});

router.get('/', auth, async (req, res) => {
    const todos = await Todo.find({ creator: req.ctx.user_id }).populate([
        { path: 'creator', model: 'user' },
        { path: 'assigned', model: 'user' },
    ]);
    res.json(todos);
});
module.exports = router;
