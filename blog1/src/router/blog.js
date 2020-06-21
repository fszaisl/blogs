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
            return new ErrorModel('数据请求错误')
        });
    }

    if (method === 'POST' && path === '/api/blog/new') {
        let blogData = { ...req.body, author: '张三' }
        return newBlog(blogData).then(insertBlog => {
            return new SuccessModel(insertBlog, '博客新增成功');
        }).catch(error => {
            return ErrorModel('新增博客失败')
        })
    }

    if (method === 'POST' && path === '/api/blog/update') {
        const blogData = { ...req.body, author: '张三' };
        return updateBlog(blogData).then(updateData => {
            return new SuccessModel('博客更新成功');
        }).catch(error => {
            return new ErrorModel('博客更新失败');
        });
    }

    if (method === 'POST' && path === '/api/blog/del') {
        const { id } = req.query;
        return delBlog(id, '张三').then((result = {}) => {
            return new SuccessModel('博客删除成功');
        }).catch(error => {
            return new ErrorModel('博客删除失败');
        });
    }
};

module.exports = handleBlogRouter;