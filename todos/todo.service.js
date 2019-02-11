const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Todo = db.Todo;
const Completed = db.Completed;

// nest.js 의 injectable 과 비슷한 느낌인가??
// function name 들을 export 함..
// 아마도 controller 에서 사용할듯
module.exports = {
    createTodo,
    getByUserId,
    removeTodo,
    confirmTodo,
};
async function confirmTodo(todoParam) {
    console.log(todoParam.todos);
    console.log(todoParam.completedTodos);

    // 1. todo 등록
    var todo = new Todo();;
    for (var i = 0; i < todoParam.todos.length; i++) {

        // todo = new Todo(todoParam.todos[i]);

        //userId: { type: String, required: true },
        //todoName: { type: String, required: true },
        //createdDate: { type: Date, default: Date.now, required: true },
        //deleted: { type: Boolean },
        todo.userId = todoParam.todos[i].userId;
        todo.todoName = todoParam.todos[i].todoName;
        //todo.createdDate = todoParam.todos[i].todoName;
        todo.deleted = false;
        todo.guid = todoParam.todos[i].guid;


        // 1. INSERT 대상건
        if (todoParam.todos[i].addYn == true) {
            console.log("Todo Insert 시작");
            // await todo.save((err) => {
            //     console.log(err);
            // });
            await Todo.findOneAndUpdate({
                userId: todoParam.todos[i].userId,
                guid: todoParam.todos[i].guid
            }, {
                $set: {
                    userId: todoParam.todos[i].userId,
                    todoName: todoParam.todos[i].todoName,
                    guid: todoParam.todos[i].guid
                }
            }, {
                upsert: true
            }).then((log) => {
                console.log("log");
                console.log(log);
            }).catch((error) => {
                console.log("error");
                console.log(error);
            });
        }
        // 2. DELETE 대상건
        else if (todoParam.todos[i].delYn == true) {
            console.log("Todo Deleted 시작");
            await Todo.findByIdAndRemove({ _id: todoParam.todos[i].todoId }, (err) => {
                console.log(err);
            });
        }
        // 아무것도 아님
        else {
            console.log("pass");
        }
    }

    // if (todoParam.completedTodos.length > 0) {
    //     console.log("lenght: " + todoParam.completedTodos.length);
    //     Completed.userId = todoParam.completedTodos[0].userId;
    //     Completed.completedDate = todoParam.completedTodos[0].completedDate;

    //     await Completed.find({ userId: Completed.userId, completedDate: Completed.completedDate }).select();
    // }

    for (var j = 0; j < todoParam.completedTodos.length; j++) {
        // Completed.userId = todoParam.completedTodos[0].userId;
        // Completed.completedDate = todoParam.completedTodos[0].completedDate;

        // completedTodo = new Completed(todoParam.completedTodos[j]);
        // 1. INSERT 대상건
        if (todoParam.completedTodos[j].addYn == true) {
            console.log("Complete Start 시작");
            console.log("userId : " + todoParam.completedTodos[j].userId);
            console.log("completed Date : " + todoParam.completedTodos[j].completedDate);
            console.log("todoId : " + todoParam.completedTodos[j].todoId);
            console.log("todoName : " + todoParam.completedTodos[j].todoName);
            console.log("guid : " + todoParam.completedTodos[j].guid);

            await Completed.findOneAndUpdate({
                userId: todoParam.completedTodos[j].userId,
                completedDate: todoParam.completedTodos[j].completedDate
            }, {
                $push: {
                    todos: {
                        todoId: todoParam.completedTodos[j].todoId,
                        todoName: todoParam.completedTodos[j].todoName,
                        guid: todoParam.completedTodos[j].guid,
                    }
                }
            }, {
                upsert: true
            }).then((log) => {
                console.log("log");
                console.log(log);
            }).catch((error) => {
                console.log("error");
                console.log(error);
            });
            // await completedTodo.save((err) => {
            //     console.log(err);
            // });
        }
        // 2. DELETE 대상건
        else if (todoParam.completedTodos[j].delYn == true) {
            console.log("Complete Deleted 시작");
            console.log("Complete Start 시작");
            console.log("userId : " + todoParam.completedTodos[j].userId);
            console.log("completed Date : " + todoParam.completedTodos[j].completedDate);
            console.log("todoId : " + todoParam.completedTodos[j].todoId);
            console.log("todoName : " + todoParam.completedTodos[j].todoName);
            console.log("guid : " + todoParam.completedTodos[j].guid);
            await Completed.findOneAndUpdate({
                userId: todoParam.completedTodos[j].userId,
                completedDate: todoParam.completedTodos[j].completedDate
            }, {
                $pull: {
                    todos: {
                        todoId: todoParam.completedTodos[j].todoId,
                        todoName: todoParam.completedTodos[j].todoName,
                        guid: todoParam.completedTodos[j].guid,
                    }
                }
            }, {
                upsert: true
            }).then((log) => {
                console.log("log");
                console.log(log);
            }).catch((error) => {
                console.log("error");
                console.log(error);
            });
        }
        // 아무것도 아님
        else {
            console.log("pass");
        }
    }
    console.log("confirmTodo 종료");
}

async function createTodo(todoParam) {
    // validate
    console.log("create Todo Start");
    console.log(todoParam);
    console.log(todoParam.todo.todoName);
    // if (await Todo.findOne({ todoName: todoParam.todo.todoName, userId: todoParam.todo.userId })) {
    //     // 존재하면 에러처리
    //     console.log("중복존재");
    //     throw 'Todoname "' + todoParam.todoParam.todo.todoName + '" is already taken';
    // }
    console.log(todoParam.todo);
    const todo = new Todo(todoParam.todo);
    console.log(todo);

    await todo.save((err) => {
        console.log(err);
    });
}

async function removeTodo(todoId) {
    console.log("todo.service.js -> removeTodo : " + todoId);
    await Todo.findByIdAndRemove({ _id: todoId }, (err) => {
        console.log(err);
    });
}

async function getByUserId(userId) {
    console.log("todo.service.js -> getByUserId Start");
    console.log(userId);
    return await Todo.find({ userId: userId }).select();
}