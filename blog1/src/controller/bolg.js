const getBlogList = (author, keyword) => {
    return [{
            id: 1,
            title: '博客A',
            content: '博客内容A',
            author: '张三',
            createTime: '2020-04-06',
            updateTime: '2020-04-06',
        },
        {
            id: 2,
            title: '博客B',
            content: '博客内容B',
            author: '李四',
            createTime: '2020-04-06',
            updateTime: '2020-04-06',
        }
    ]
};

const getDetail = (id) => {
    return {
        id: 2,
        title: '博客B',
        content: '博客内容B',
        author: '李四',
        createTime: '2020-04-06',
        updateTime: '2020-04-06',
    }
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