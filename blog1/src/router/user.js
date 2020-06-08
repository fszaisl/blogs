const { ErrorModel, SuccessModel } = require('../model/resModel');
const { loginToBlog } = require('../controller/user');

const handleUserRouter = (req, res) => {
    const { method, path, body } = req;
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = body;
        const result = loginToBlog(username, password);
        if (result) {
            return new SuccessModel('登录成功');
        } else {
            return new ErrorModel('登录失败');
        }
    }
};

module.exports = handleUserRouter;