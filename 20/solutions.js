import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
fileContent.split(/\r?\n/).forEach(line => console.log(line))