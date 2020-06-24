const { ErrorModel, SuccessModel } = require('../model/resModel');
const { loginToBlog } = require('../controller/user');
const _ = require('lodash');

const handleUserRouter = (req, res) => {
    const { method, path, body, session } = req;
    if (method === 'GET' && path === '/api/user/login') {
        const { username, password } = req.query;
        console.log(`username, password==`, username, password);
        return loginToBlog(username, password).then(result => {
            Object.assign(req.session, result);
            return new SuccessModel('登录成功');
        }).catch(error => {
            console.log(`loginToBlog= ErrorModel ==`, error)
            return new ErrorModel('登录失败');
        });
    }

    if (method === 'GET' && path === '/api/user/test') {
        if (!_.isEmpty(session)) {
            return Promise.resolve(new SuccessModel(session, '已经登录'));
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }


};

module.exports = handleUserRouter;