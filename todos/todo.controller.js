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
    console.loge("getByUserId Start");
    todoService.getByUserId(req.body).then(todos => res.json(todos))
    .catch(err => next(err));;
}