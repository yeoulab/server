var client_id = 'gGeZ9i_jrqofbACc0C6q';
var client_secret = 'ctpfKFL9qj';
var state = 'yeoulab'
var redirectURI = encodeURI("http://localhost:8080/login");

// nest.js 의 injectable 과 비슷한 느낌인가??
// function name 들을 export 함..
// 아마도 controller 에서 사용할듯
module.exports = {
    naverlogin,
    naverCallback,
    naverInfo,
};

// app.get('/member', function (req, res) 
async function naverInfo( req, res ) {

    var token = req.body.token;
    var header = "Bearer " + token; // Bearer 다음에 공백 추가

    var api_url = 'https://openapi.naver.com/v1/nid/me';
    var request = require('request');
    var options = {
       url: api_url,
       headers: {'Authorization': header}
    };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        console.log('error');
        if(response != null) {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
        }
      }
    });
 }

// '/naverlogin'
async function naverlogin( req, res ) {
    console.log("naver login start");
    var api_uri = '';
    // var state = '';

    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id 
            + '&redirect_uri=' + redirectURI + '&state=' + state;
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
}

// '/naverCallback'
async function naverCallback( req, res ){
    console.log("naver Callback Start");
    var code = req.body.code;
    var state = req.body.state;
    var api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='+ client_id 
            + '&client_secret=' + client_secret 
            + '&redirect_uri=' + redirectURI 
            + '&code=' + code 
            + '&state=' + state;
    var request = require('request');
    var options = {
         url: api_url,
         headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);

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