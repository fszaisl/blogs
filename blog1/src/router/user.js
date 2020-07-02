const { ErrorModel, SuccessModel } = require('../model/resModel');
const { loginToBlog } = require('../controller/user');
const _ = require('lodash');
const redis = require('../db/redis');

const handleUserRouter = (req, res) => {
    const { method, path, body, query, session, sessionId } = req;
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = body;
        console.log(`username, password==`, username, password);
        return loginToBlog(username, password).then(result => {
            Object.assign(session, result);
            redis.set(sessionId, session)
            return new SuccessModel(result, '登录成功');
        }).catch(error => {
            console.log(`loginToBlog= ErrorModel ==`, error)
            return new ErrorModel('登录失败');
        });
    }

    if (method === 'GET' && path === '/api/user/test') {
        if (!_.isEmpty(session)) {
            return redis.get(sessionId).then(value => {
                console.log(`redis.get == `, value)
                return new SuccessModel(session, '已经登录')
            })
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }


};

module.exports = handleUserRouter;