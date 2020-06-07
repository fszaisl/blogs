const http = require('http');
const serverHandle = require('../app');
const port = 5000;

const server = http.createServer(serverHandle);

server.listen(port, () => {
    console.log(`server ${port} is starting ......`);
});