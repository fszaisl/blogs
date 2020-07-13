// const c = require('crypto-js');
const crypto = require('crypto'); //nodejs 自带

const secret = 'FSZ_xiao123098';

const hash = content => {
    const md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

const encryption = (password) => {
    const str = `password=${password}&key=${secret}`
    return hash(str)
}

module.exports = {
    encryption
}