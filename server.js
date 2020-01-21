//--------------------------------------
// import libraries for making cluster
var cluster = require('cluster');
var os = require('os');
var uuid = require('uuid');
var instance_id = uuid.v4();
var cpuCount = os.cpus().length;
var workerCount = 1;
//var workerCount = cpuCount / 2;
//--------------------------------------

if (cluster.isMaster) {
    console.log('server ID:' + instance_id);
    console.log('the number of server cpu :' + cpuCount);
    console.log('the number of workers being created : ' + workerCount);
    console.log(workerCount + ' are being created');

    var workerMsgListner = (msg) => {

        var worker_id = msg.worker_id;

        if (msg.cmd === 'MASTER_ID') {
            cluster.workers[worker_id].send({ cmd: 'MASTER_ID', master_id: instance_id });
        }
    }

    // create workers as much as the number of cpu
    for (var i = 0; i < workerCount; i++) {
        console.log('workers created[' + (i + 1) + '/' + workerCount + ']');
        var worker = cluster.fork();

        worker.on('message', workerMsgListner);
    }

    // when workers are online
    cluster.on('online', (worker) => {
        console.log('worker online - worker id : [' + worker.process.pid + ']');
    });

    // when workers are killed, reoperate it
    cluster.on('exit', (worker) => {
        console.log('worker killed - id : [ ' + worker.process.pid + ']');
        console.log('while creating other workers');

        var worker = cluster.fork();

        worker.on('message', workerMsgListner);
    })
} else if (cluster.isWorker) {
    require('rootpath')();
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const jwt = require('_helpers/jwt');
    const errorHandler = require('_helpers/error-handler');

    var express = require('express');
    var app = express();
    var worker_id = cluster.worker.id;
    var master_id;

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // 대외 ip 에서도 접근 가능
    app.use(cors());

    // use JWT auth to secure the api
    // 서버 최상단에 jwt 가 있으면
    // login 을 하지 않으면 어떠한 api 도 접근할 수 없다.
    app.use(jwt());

    // api routes
    app.use('/server/users', require('./users/users.controller'));
    app.use('/server/todos', require('./todos/todo.controller'));
    app.use('/server/complete', require('./completed/completed.controller'));
    app.use('/server/social', require('./social/naver.controller'));
    // api todos 는 또 다른 걸 이용하자.

    // global error handler
    app.use(errorHandler);

    // app.use(history());

    // start server
    const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
    // console.log(process.env.NODE_ENV);
    var server = app.listen(port, function() {
        console.log('Server listening on port ' + port);
        // console.log(process.env.MONGODB);
    });

    // console.log('worker_id : ' + worker_id);
    process.send({ worker_id: worker_id, cmd: 'MASTER_ID' });
    process.on('message', (msg) => {
        if (msg.cmd === 'MASTER_ID') {
            master_id = msg.master_id;
        }
    })
}
