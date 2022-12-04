import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

let increase = 0;
const sensorData = fileContent.split(/\r?\n/).map(line => Number(line));
sensorData.forEach((sensorPoint, index) => {
    if (index > 0 && sensorPoint > sensorData[index - 1]) increase+=1;
})
console.log(increase)

let windows = []
sensorData.forEach((sensorPoint, index) => {
    try{windows[windows.length-1-1].push(sensorPoint)}catch(ignored){}
    try{windows[windows.length-1].push(sensorPoint)}catch(ignored){}
    windows.push([sensorPoint]);
})
let increaseOfWindow = 0;
const windowSums = windows.map(([a, b, c]) => a+b+c);
windowSums.forEach((windowSum, index) => {
    //console.log(windowSum)
    try{if(windowSum > windowSums[index - 1]) increaseOfWindow+=1}catch(ignored){}
})
console.log(increaseOfWindow)