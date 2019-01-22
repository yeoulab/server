const config = require('config.json');
const mongoose = require('mongoose');
// mongoDB 접속 정보
// config.json 에 mongboDB 서버 설정을 해 놓음
// "connectionString": "mongodb://localhost:27017/testDb",
// command line 에서 확인하는 바업
// mongo testDb
// db.테이블명.find()
//"mongodb://localhost:27017/testDb",
if (process.env.MONGODB_PORT_27017_TCP_ADDR === undefined) {
    process.env.MONGODB_PORT_27017_TCP_ADDR = 'localhost';
}
console.log("process.env.MONGODB_PORT_27017_TCP_ADDR : " + process.env.MONGODB_PORT_27017_TCP_ADDR);
//const mongoUrl = "mongodb://" + process.env.MONGODB_PORT_27017_TCP_ADDR + ":27017/testDb";
//const mongoUrl = "mongodb://10.146.0.2:27017/testDb";
const mongoUrl = "mongodb://localhost:27017/testDb";


mongoose.connect(mongoUrl);
mongoose.Promise = global.Promise;

// 연결정보 확인
var db = mongoose.connection;

db.on('error', () => console.log('Connection Failed'));
db.once('open', () => console.log('Connected'));

// application 내의 모든 model 들을 관리한다.
// 하나의 접점으로부터 data 의 모든 부분을 관리하도록 만든 파일
// table 이 추가되면 db.js 에서 export 를 해줘야 module 에서 사용
module.exports = {
    User: require('../users/user.model'),
    Todo: require('../todos/todo.model'),
    Completed: require('../completed/completed.model'),
};