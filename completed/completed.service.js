const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Completed = db.Completed;

// nest.js 의 injectable 과 비슷한 느낌인가??
// function name 들을 export 함..
// 아마도 controller 에서 사용할듯
module.exports = {
    completeTodo,
    getCompletedTodo,
    rmCompletedTodo,
};

async function completeTodo(todoParam) {
    // validate
    console.log("completeTodo Start");
    const completedTodo = new Completed(todoParam.todo);
    // console.log(completedTodo);

    await completedTodo.save((err) => {
        console.log(err);
    })
}

async function rmCompletedTodo(todo) {
    console.log("rmCompletedTodo");
    await Completed.findByIdAndRemove({ _id: todo.completedTodoId }, (err) => {
        console.log(err);
    });
}

async function removeAll(todo) {
    console.log("rmCompletedTodo");
    await Completed.findByIdAndRemove({ userId: todo.userId, _id: todo.completedTodoId }, (err) => {
        console.log(err);
    });
}

async function getCompletedTodo(userId, completedDate) {
    console.log("getCompletedTodo Start");
    console.log(userId + " ---- " + completedDate);
    return await Completed.find({ userId: userId, completedDate: completedDate }).select();
}