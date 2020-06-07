const _ = require('lodash');
class BaseModel {
    constructor(data, message) {
        if (_.isString(data)) {
            this.message = data;
            data = null;
            message = null;
        }
        if (_.isObject(data)) {
            this.data = data;
        }
        if (!_.isEmpty(message)) {
            this.message = message;
        }
    }
};

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.hasError = false;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.hasError = true;
    }
}

module.exports = { SuccessModel, ErrorModel };