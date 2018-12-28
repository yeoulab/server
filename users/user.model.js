const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 스키마 정의
const schema = new Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

// json 형태로 변환
schema.set('toJSON', { virtuals: true });

// User 라는 이름의 schema 로 export 함
module.exports = mongoose.model('User', schema);