var client_id = 'gGeZ9i_jrqofbACc0C6q';
var client_secret = 'ctpfKFL9qj';
var state = 'yeoulab'
var redirectURI = encodeURI("http://localhost:4000/social/naverInfo");
const querystring = require('querystring');

// nest.js 의 injectable 과 비슷한 느낌인가??
// function name 들을 export 함..
// 아마도 controller 에서 사용할듯
module.exports = {
    naverlogin,
    naverCallback,
    naverInfo,
    naverGetCode,
};

async function naverGetCode(req, res) {
    console.log("naverGetCode Start");
    // console.log(req);
    var code = req.query.code;
    var state = req.query.state;

    if (state === "register") {
        res.writeHead(301, { Location: 'http://yeoulab.ml/#/register?&code=' + code + '&state=' + state });
    } else if (state === "login") {
        res.writeHead(301, { Location: 'http://yeoulab.ml/#/login?&code=' + code + '&state=' + state });
    }


    res.end();
}

// app.get('/member', function (req, res)
// after getting the token, able to get the user info
async function naverInfo(req, res) {

    var token = req.body.token;
    var header = "Bearer " + token; // Bearer 다음에 공백 추가

    var api_url = 'https://openapi.naver.com/v1/nid/me';
    var request = require('request');
    var options = {
        url: api_url,
        headers: { 'Authorization': header }
    };
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
        } else {
            console.log('error');
            if (response != null) {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        }
    });
}

// '/naverlogin'
// this is a 'a' tag for getting naver url from naver server
// this isn't needed
async function naverlogin(req, res) {
    console.log("naver login start");
    var api_uri = '';
    // var state = '';

    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id +
        '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end("<a href='" + api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
}

// '/naverCallback'
// first step
// by using code and state, I'm able to get a token from naver server
// , which is needed to get a naver information
async function naverCallback(req, res) {
    console.log("naver Callback Start");
    // console.log(req);
    var code = req.body.code;
    var state = req.body.state;
    var api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' + client_id +
        '&client_secret=' + client_secret +
        '&redirect_uri=' + redirectURI +
        '&code=' + code +
        '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };

    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // res.writeHead(301,
            //     {Location: 'http://localhost:8080/#/login?token=`'}
            // );
            // res.end(body);
            res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            res.end(body);
            // var data = JSON.parse(body)
            // console.log(data.access_token);
            // // console.log(access_token);

            // naverGetInfo(data.access_token).then( (naverData) =>{
            //     var infoData = JSON.parse(naverData);
            //     console.log(infoData.response);
            //     // var accountData = JSON.parse(infoData.response);
            //     account = querystring.stringify(infoData.response);
            //     console.log("account :"+ account);
            //     res.writeHead(301,
            //         {Location: 'http://localhost:8080/#/login&' + account}
            //     );
            //     res.end();
            // })

            // if success

            // get naver infor

            // if sucess

            // login and page direct to localhost:8080/login
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
    //   app.listen(3000, function () {
    //     console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
    //   })    
}

async function naverGetInfo(token) {

    var header = "Bearer " + token; // Bearer 다음에 공백 추가
    var api_url = 'https://openapi.naver.com/v1/nid/me';
    var request = require('request');

    console.log("token :" + token);

    var options = {
        url: api_url,
        headers: { 'Authorization': header }
    };
    return new Promise((resolve, reject) => {
        request.get(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                // res.end(body);
                console.log(body);
                resolve(body);
            } else {
                console.log('error');
                if (response != null) {
                    //   res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
                reject();
            }
        });
    });
}