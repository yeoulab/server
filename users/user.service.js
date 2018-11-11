const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

// nest.js 의 injectable 과 비슷한 느낌인가??
// function name 들을 export 함..
// 아마도 controller 에서 사용할듯
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    // jwt 를 사용하면 user 의 session 을 관리할 필요가 없음
    console.log("authentication Start");
    const user = await User.findOne({ username });
    // user 를 받아와야 아래를 실행한다.

    // user 가 존재하고
    // password 가 정확하면
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

// mongoose 에 내제함수인듯 find/findById 등
async function getAll() {
    console.log("getAll");
    return await User.find().select('-hash');
}

async function getById(id) {
    console.log("getById");
    console.log(id);
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    // User  내에서 username 으로 대상을 조회해서
    //console.log("create User Start");
    ///console.log(userParam);
    if (await User.findOne({ username: userParam.username })) {
        // 존재하면 에러처리
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // 입력 받은 userParam 을 user 프로퍼티로 세팅
    // User 는 mongoose 에서 설정한 User Schema.
    const user = new User(userParam);
    //console.log("user ↓↓↓↓↓↓↓");
    //console.log(user);

    // hash password
    // password 를 받아서 암호화 한 다음에 hash 에다가 세팅
    if (userParam.password) { // 입력받은 패스워드를 암호화처리
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    console.log("update user start");
    const user = await User.findById(id);
    console.log("user ↓↓↓↓↓↓↓");
    console.log(user);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    console.log("흑흑 삭제 start");
    await User.findByIdAndRemove(id);
}