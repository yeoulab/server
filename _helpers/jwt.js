// client 로부터 온 http request 안에 받은 JWT Token 이 
// API 에 접근하기 전에 유효한지를 체크하며
// Token 이 invalid 할 경우 401 error 를 리턴한다.
// require는  import 와 같은 개념이다.
const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/server/users/authenticate',
            '/server/users/register',
            '/server/social/naverlogin',
            '/server/social/naverCallback',
            '/server/social/naverInfo',
            '/server/social/naverGetCode',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
