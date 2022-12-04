import * as fs from 'fs';
import {Lanternfish} from "./Lanternfish";

const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const fishes: Lanternfish[] = []
fileContent.split(",").forEach(spawnTime => fishes.push(new Lanternfish(Number(spawnTime))))
//fishes.forEach(fish => console.log(fish))

const recursion = (fishes: Lanternfish[], day, until): Lanternfish[] => {
    if(day === until) return fishes;
    const newFishes: Lanternfish[] = []
    for (const fish of fishes) {
        const res = fish.tick()
        if(res) newFishes.push(res)
    }
    fishes.push(...newFishes)
    //console.log(fishes)
    return recursion(fishes, day+1, until)
}
/*
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n2,3,2,0,1","\n--------")
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n1,2,1,6,0,8","\n--------")
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n0,1,0,5,6,7,8","\n--------")
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n6,0,6,4,5,6,7,8,8","\n--------")
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n5,6,5,3,4,5,6,7,7,8","\n--------")
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n4,5,4,2,3,4,5,6,6,7","\n--------")
console.log(recursion(fishes, 0, 1).map((fish: Lanternfish) => fish.timer).join(","),"\n3,4,3,1,2,3,4,5,5,6","\n--------")
*/

/* Part 2: 256 days (Recursion depth killed me so new approach in O(n) */
const population = new Map([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
])
// Fill population with initial puzzle input (still uses the class because I don't want to re-read it)
fishes.map(fish => fish.timer).forEach(timervalue => population.set(timervalue, population.get(timervalue)+1))
console.log('initial population', population.values())
for (let i = 0; i < 256; i++) {
    const newcomer = population.get(0);
    for (let j = 0; j < 8; j++) {
        population.set(j, population.get(j+1));
    }
    population.set(6, population.get(6)+newcomer)
    population.set(8, newcomer)
}
const result = Array.from(population.values()).reduce((sum, value) => sum+value)
console.log(result)