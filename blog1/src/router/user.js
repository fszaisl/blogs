const handleUserRouter = (req, res) => {
    const { method, path, query } = req;
    if (method === 'POST' && path === '/api/user/login') {
        return { message: '你访问了登录接口' };
    }
};

module.exports = handleUserRouter;