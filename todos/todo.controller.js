const express = require('express');
const router = express.Router();
const todoService = require('./todo.service');

router.post('/create', createTodo);
router.post('/remove', removeTodo);
router.get('/:id', getByUserId);
router.post('/confirm', confirmTodo);

module.exports = router;

function confirmTodo(req, res, next) {
    console.log("req.body : " + req.body);
    todoService.confirmTodo(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createTodo(req, res, next) {
    console.log("req.body : " + req.body);
    todoService.createTodo(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function removeTodo(req, res, next) {
    console.log("req.body : " + req.body);
    todoService.removeTodo(req.body.todoId)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getByUserId(req, res, next) {
    console.log(req.params.id);
    todoService.getByUserId(req.params.id).then(todos => res.json(todos))
        .catch(err => next(err));;
}