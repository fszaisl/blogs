const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');
const _ = require('lodash');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on('error', error => {
    console.log(`redis error == `, error);
});

const set = (key = '', value = '') => {
    if (_.isObject(value)) {
        value = JSON.stringify(value);
    }
    redisClient.set(key, value, redis.print);
};

const get = (key = '') => {
    let promise = new Promise((resolve, reject) => {
        redisClient.get(key, (error, value) => {
            if (error) {
                reject(error);
                return
            }
            if (value === null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(value));
            } catch (error) {
                resolve(value)
            }
        })
    });
    return promise;
};


module.exports = {
    set, get
};