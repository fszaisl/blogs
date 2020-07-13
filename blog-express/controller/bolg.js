const { mysqlExec, escape } = require('../db/mySql');
const _ = require('lodash');
const moment = require('moment');
const xss = require('xss');

const formatDate = data => moment(data).format('YYYY-MM-DD HH:mm:ss');

const getBlogList = (author = '', keyword = '') => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        author = escape(author); // 预防mysql注入
        sql += `and author=${author} `;
    }
    if (keyword) {
        // keyword = escape(keyword); // 预防mysql注入
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc`;
    console.log(`sql===${sql}`)
    return mysqlExec(sql).then(bloglist => {
        _.forEach(bloglist, blog => {
            blog.createtime = formatDate(blog.createtime);
        })
        return bloglist;
    });
};

const getDetail = (id = '') => {
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

const newBlog = (data = {}) => {
    let { title, content, author } = data;
    title = xss(title); // 预防xss攻击
    content = xss(content); // 预防xss攻击

    const sql = `insert into blogs (title,content,author,createtime) values (
        '${title}','${content}','${author}',now() 
    );`;
    console.log(`sql = ${sql}`)
    return mysqlExec(sql).then((insertData = {}) => {
        let { affectedRows, insertId } = insertData;
        if (affectedRows > 0 && insertId) {
            return { id: insertId }
        }
        return Promise.reject('新增失败')
    });
}

const updateBlog = (data = {}) => {
    let { id, title, content, author } = data;
    title = xss(title); // 预防xss攻击
    content = xss(content); // 预防xss攻击
    const sql = `update blogs set 
    title = '${title}' , 
    content = '${content}' , 
    updatetime = now() 
    where id=${id} and author='${author}' ;`

    return mysqlExec(sql).then((updateData = {}) => {
        const { changedRows } = updateData;
        if (changedRows > 0) {
            return true;
        }
        return Promise.reject();
    })
}

const delBlog = (id = '', author = '') => {
    const sql = `delete from blogs where id='${id}' and author='${author}' ;`
    return mysqlExec(sql).then((deleteData = {}) => {
        const { affectedRows } = deleteData;
        if (affectedRows > 0) {
            return true;
        }
        return Promise.reject()
    })
}

module.exports = {
    getBlogList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}