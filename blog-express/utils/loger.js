const fs = require('fs');
const path = require('path');

const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../../logs', fileName);
    // console.log(fullFileName);
    return fs.createWriteStream(fullFileName, { flags: 'a' })
}
const writeLog = (stream, log) => {
    stream.write(log + '\n');
}


const accessWrite = createWriteStream('access.log.txt');
const accessLog = (log) => {
    writeLog(accessWrite, log)
}

const eventWrite = createWriteStream('event.log.txt');
const eventLog = (log) => {
    writeLog(eventWrite, log)
}

const errorWrite = createWriteStream('error.log.txt');
const errorLog = (log) => {
    writeLog(errorWrite, log)
}


module.exports = {
    accessLog,
    eventLog,
    errorLog
}