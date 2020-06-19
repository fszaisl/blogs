const { mysqlExec } = require('../db/mySql');
const _ = require('lodash');
const moment = require('moment');

const formatDate = data => moment(data).format('YYYY-MM-DD HH:mm:ss');


const getBlogList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc`;
    return mysqlExec(sql).then(bloglist => {
        _.forEach(bloglist, blog => {
            blog.createtime = formatDate(blog.createtime);
        })
        return bloglist;
    });
};

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`;
    // console.log(`sql=${sql}`)
    return mysqlExec(sql).then((blogs = []) => {
        let [blog = {}] = blogs;
        blog.createtime = formatDate(blog.createtime);
        if (blog.updatetime) {
            blog.updatetime = formatDate(blog.updatetime);
        }
        // console.log(`blog=`, JSON.stringify(blog))
        return blog
    });
}

const newBlog = (data) => {
    const { title, content } = data;
    return { id: 3 }
}

const updateBlog = (data = {}) => {
    const { id, title, content } = data;
    return true;
}

const delBlog = (id = '') => {
    console.log(`delBlog`, id)
    return true;
}

module.exports = {
    getBlogList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}