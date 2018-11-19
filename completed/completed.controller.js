const express = require('express');
const router = express.Router();
const completedService = require('./completed.service');

router.post('/', completeTodo);
router.get('/:id/:dt', getCompletedTodo);

module.exports = router;

function completeTodo(req, res, next) {
    console.log("completeTodo Start");
    console.log("req.body : " + req.body);
    completedService.completeTodo(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getCompletedTodo(req, res, next) {
    console.log("getByUserId Start");
    console.log(req.params.id);
    console.log(req.params.dt);
    completedService.getCompletedTodo(req.params.id, req.params.dt)
    .then(todos => res.json(todos))
    .catch(err => next(err));;
}