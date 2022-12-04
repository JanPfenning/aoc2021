import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
const crabs = fileContent.split(",").map(crabPos => Number(crabPos))//.forEach(crabPos => console.log(crabPos))

const getFuelForAlignmentAt = (position: number) => {
    return crabs
        .map((value, index) => index===0?(Math.abs(value - position) * (Math.abs(value - position)+1)) / 2:value) //First value has to be adjusted by hand because reduce is weird
        .reduce((sum, crabPos) => sum + (Math.abs(crabPos - position) * (Math.abs(crabPos - position)+1)) / 2) // sum from 1 to n for part 2
}
const result = Array.from(Array(Math.max(...crabs)).keys())
    .map(potentialSweetSpot => getFuelForAlignmentAt(potentialSweetSpot))
console.log(Math.min(...result)) // 999279 too high; 474454 too high