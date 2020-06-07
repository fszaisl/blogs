const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getBlogList, getDetail, newBlog } = require('../controller/bolg');
const handleBlogRouter = (req, res) => {
    const { method, path, query } = req;

    if (method === 'GET' && path === '/api/blog/list') {
        const { author = '', keyword = '' } = req;
        const blogList = getBlogList(author, keyword);
        return new SuccessModel(blogList);
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const { id = '' } = req;
        const data = getDetail(id);
        return new SuccessModel(data);
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const { body } = req;
        const result = newBlog(body);
        return new SuccessModel(result);
    }
    if (method === 'POST' && path === '/api/blog/update') {
        return { message: '你访问了blog/update' };
    }
    if (method === 'POST' && path === '/api/blog/del') {
        return { message: '你访问了blog/del' };
    }
};

module.exports = handleBlogRouter;