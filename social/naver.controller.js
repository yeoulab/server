const express = require('express');
const router = express.Router();
const userService = require('./naver.service');

// routes
router.get('/naverlogin', naverlogin);
router.post('/naverCallback', naverCallback);
router.post('/naverInfo', naverInfo);

module.exports = router;

function naverInfo(req, res, next) {
    console.log("naverInfo start");
    userService.naverInfo(req, res)
        .then()
        .catch();
}

function naverlogin(req, res, next) {
    console.log("naver login start");
    userService.naverlogin(req, res)
        .then()
        .catch();
}

function naverCallback(req, res, next) {
    userService.naverCallback(req, res)
        .then()
        .catch();
}