const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getBlogList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/bolg');
const handleBlogRouter = (req, res) => {
    const { method, path, query } = req;

    if (method === 'GET' && path === '/api/blog/list') {
        const { author = '', keyword = '' } = req.query;
        return getBlogList(author, keyword).then(result => {
            return new SuccessModel(result);
        }).catch(error => {
            return new ErrorModel('数据请求错误')
        });
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const { id = '' } = req.query;
        return getDetail(id).then(blog => {
            return new SuccessModel(blog)
        }).catch(error => {
            console.log(error)
            return new ErrorModel('数据请求错误')
        });
    }
    if (method === 'POST' && path === '/api/blog/new') {
        const result = newBlog(req.body);
        return new SuccessModel(result);
    }
    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(req.body);
        if (result) {
            return new SuccessModel('博客更新成功');
        } else {
            return new ErrorModel('博客更新失败');
        }
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const { id } = req.query;
        const result = delBlog(id);
        if (result) {
            return new SuccessModel('博客删除成功');
        } else {
            return new ErrorModel('博客删除失败');
        }
    }
};

module.exports = handleBlogRouter;