const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마 정의
const schema = new Schema({
    userId: { type: String, required: true },
    todoName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now, required: true },
    guid: { type: String, required: true },
    deleted: { type: Boolean },

});

// json 형태로 변환
schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Todo', schema);