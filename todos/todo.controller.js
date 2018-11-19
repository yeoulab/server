const express = require('express');
const router = express.Router();
const todoService = require('./todo.service');

router.post('/create', createTodo);
router.get('/:id', getByUserId);

module.exports = router;

function createTodo(req, res, next) {
    console.log("createTodo Start");
    console.log("req.body : " + req.body);
    todoService.createTodo(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    console.log("getByUserId Start");
    console.log(req.params.id);
    todoService.getByUserId(req.params.id).then(todos => res.json(todos))
    .catch(err => next(err));;
}