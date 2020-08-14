const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const key = 'fsz123456012345678901234';
// 密钥长度取决于算法。 
// 在此示例中，对于 aes192，它是 24 个字节（192 位）。
// 改为使用异步的 `crypto.scrypt()`。
// const key = crypto.scryptSync(password, '盐值', 24);
// IV 通常与密文一起传递。
const iv = Buffer.alloc(16, 0); // 初始化向量。

export const enCrypt = (data) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export const deCrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}