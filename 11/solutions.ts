import * as fs from 'fs';
import {Octopus} from "./Octopus";
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
const inputLines = fileContent.split(/\r?\n/)


function flattenArray(nDimensionalArray) {
    let flattenedArray = nDimensionalArray;
    while (flattenedArray.some(Array.isArray)) {
        flattenedArray = [].concat(...flattenedArray);
    }
    return flattenedArray;
}

const readDigitGrid = (inputListOfConcatenatedDigitsAsString) => inputListOfConcatenatedDigitsAsString
    .map(lineOfConcatenatedDigitsAsString => lineOfConcatenatedDigitsAsString
        .split('')
        .map(digit => Number(digit))
    )

const digitGrid = readDigitGrid((inputLines))
const octopusGrid = digitGrid.map((digitGridRow, x) => digitGridRow.map((digitGridElement, y) => new Octopus(digitGridElement, x, y)))
//console.log(octopusGrid)

function octopusSimulation(octopuses: Octopus[]) {
    // increase energy level of all octopuses
    octopuses.forEach(octopus => octopus.increaseEnergyLevel());

    // try to trigger flash for each octopus (will only flash if the octopus is ready)
    let flashedOctopuses = [];
    do{
        flashedOctopuses = octopuses.filter(octopus => octopus.flash());
        // increase energy levels of all adjacent octopuses
        flashedOctopuses.forEach(({x, y, ...octopus}: Octopus) => {
            octopuses.filter(octopus =>
                (octopus.x !== x || octopus.y !== y)
                && Math.abs(octopus.x-x) <= 1
                && Math.abs(octopus.y-y) <= 1
            ).forEach(adjacentOctopus => adjacentOctopus.increaseEnergyLevel())
        })
    }while(flashedOctopuses.length > 0)

    // try to reset energy level of all octopuses (will only work on those that flashed)
    octopuses.forEach(octopus => octopus.resetEnergyLevel());
}

const octopusList = flattenArray(octopusGrid)

/*
// Solution to part 1:
// -------------------

console.log('initial octopuses')
console.log(octopusList)
for (let i = 0; i < 100; i++) {
    octopusSimulation(octopusList)
}
const result = octopusList.map(octopus => octopus.flashes)
console.log(result.reduce((sum, value) => sum+value))
*/

//console.log('initial octopuses')
//console.log(octopusList)
let counter = 0
while(octopusList.filter((octopus: Octopus) => octopus.energyLevel !== 0).length !== 0) {
    octopusSimulation(octopusList)
    counter++;
}
console.log('found at '+counter)