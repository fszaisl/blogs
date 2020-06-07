const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-Type', 'application/json');

    let resdata = {
        name: 'zhangsan',
        age: 12,
        titie: '123',
        env: process.env.NODE_ENV,
        say: () => {

        }
    }

    res.end(JSON.stringify(resdata));

};

module.exports = serverHandle;