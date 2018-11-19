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
};

async function completeTodo(todoParam) {
    // validate
    console.log("create Todo Start");
    console.log(todoParam);
    console.log(todoParam.todo.todoName);
    if (await Todo.findOne({ todoId: todoParam.todo.todoId
                           , completedDate: todoParam.todo.completedDate })) {
        // 존재하면 에러처리
        console.log("중복존재");
        throw 'Todoname "' + todoParam.todoParam.todo.todoName + '" is already taken';
    }
    console.log(todoParam.todo);
    const completedTodo = new Completed(todoParam.todo);
    console.log(completedTodo);

    await completedTodo.save();
}

async function getCompletedTodo(userId, completedDate){
    console.log("getCompletedTodo Start");
    console.log(userId + " ---- " + completedDate);
    return await Todo.find({ userId: userId, completedDate: completedDate }).select();
}