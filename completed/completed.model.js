const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마 정의
// const schema = new Schema({
//     todoName: { type: String, required: true },
//     completedDate: { type: String, required: true },
//     userId: { type: String, required: true },
//     todoId: { type: String, required: true }
// });

const schema = new Schema({
    userId: { type: String, required: true },
    completedDate: { type: String, required: true },
    todos: [new Schema({
        todoId: String,
        todoName: String,
        guid: String,
    })]
});

// json 형태로 변환
schema.set('toJSON', { virtuals: true });

// User 라는 이름의 schema 로 export 함
module.exports = mongoose.model('Completed', schema);