const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Todo = db.Todo;

// nest.js 의 injectable 과 비슷한 느낌인가??
// function name 들을 export 함..
// 아마도 controller 에서 사용할듯
module.exports = {
    createTodo,
    getByUserId
};

async function createTodo(todoParam) {
    // validate
    console.log("create Todo Start");
    console.log(todoParam);
    console.log(todoParam.todo.todoName);
    if (await Todo.findOne({ todoName: todoParam.todo.todoName, userId: todoParam.todo.userId })) {
        // 존재하면 에러처리
        console.loge("중복존재");
        throw 'Todoname "' + todoParam.todoParam.todo.todoName + '" is already taken';
    }
    console.log(todoParam.todo);
    const todo = new Todo(todoParam.todo);
    console.log(todo);

    await todo.save();
}

async function getByUserId(userId){
    console.log("todo.service.js -> getByUserId Start");
    console.log(userId);
    return await Todo.find({ userId: userId }).select ;
}