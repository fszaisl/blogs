const fs = require('fs');
const path = require('path');
const readline = require('readline')

const fileName = path.join(__dirname, '../logs', 'access.log.txt');

const readStream = fs.createReadStream(fileName);

let rl = readline.Interface({
    input: readStream,
    output: null
})

rl.on('line', (error, data) => {
    console.log(error)
    console.log(data)
})

rl.on('end', (error, data) => {
    console.log(error)
    console.log(data)
})