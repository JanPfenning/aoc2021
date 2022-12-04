import * as fs from 'fs';
import {Coordinate, VentLine} from "./ventLine";
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const boardSize = 1000
const board = Array.from(Array(boardSize).keys()).map(row => Array.from(Array(boardSize).keys()).map(value => 0))

const increaseCoordinateHit = (coordinate: Coordinate) => {
    board[coordinate.x][coordinate.y] += 1
}

fileContent.split(/\r?\n/)
    .map(line => line.split(/(,|(\s->\s))/).filter(group => Number(group) === 0 ? true : Number(group)))
    .map(line => line.map(value => Number(value)))
    .map(line => new VentLine(line[0], line[1], line[2], line[3]))
    .forEach((ventLine: VentLine) => ventLine.getCoordinatesWithin()
        .forEach(coordinate => increaseCoordinateHit(coordinate))
    )

// Print board
board.map((_, colIndex) => board.map(row => row[colIndex])).forEach(row => console.log(`[${row}]`))

const result = board.flat().filter(value => value>=2).length;
console.log(result) //Part1: 6397 //Part2: 22335
