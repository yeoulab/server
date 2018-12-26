const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마 정의
const schema = new Schema({
    todoName: { type: String, required: true },
    deleted: { type: Boolean },
    createdDate: { type: Date, default: Date.now },
    userId: { type: String, required: true }
});

// json 형태로 변환
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Todo', schema);