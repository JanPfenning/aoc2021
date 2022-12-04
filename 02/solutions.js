import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

let horizontalPosition = 0;
let depth = 0;

const commandStringToFunction = new Map([
    ['forward', (number) => horizontalPosition+=number],
    ['up', (number) => depth-=number],
    ['down', (number) => depth+=number],
])

fileContent.split(/\r?\n/)
    .map(line => line.split(" "))
    .map(([command, amount]) => [command, Number(amount)])
    .forEach(([command, amount]) => commandStringToFunction.get(command)(amount))

console.log(`depth: ${depth}\nhorizontal: ${horizontalPosition}`);
console.log(`depth * horizontal: ${depth*horizontalPosition}`);

let aim = 0;
horizontalPosition = 0;
depth = 0;
const commandStringToFunctionPart2 = new Map([
    ['forward', (number) => {horizontalPosition+=number; depth+=aim*number}],
    ['up', (number) => {aim-=number}],
    ['down', (number) => {aim+=number}],
])
fileContent.split(/\r?\n/)
    .map(line => line.split(" "))
    .map(([command, amount]) => [command, Number(amount)])
    .forEach(([command, amount]) => commandStringToFunctionPart2.get(command)(amount))
console.log(`depth * horizontal: ${depth*horizontalPosition}`);