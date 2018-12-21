require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 대외 ip 에서도 접근 가능
app.use(cors());

// use JWT auth to secure the api
// 서버 최상단에 jwt 가 있으면
// login 을 하지 않으면 어떠한 api 도 접근할 수 없다.
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/todos', require('./todos/todo.controller'));
app.use('/complete', require('./completed/completed.controller'));
// api todos 는 또 다른 걸 이용하자.

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function() {
    console.log('Server listening on port ' + port);
});