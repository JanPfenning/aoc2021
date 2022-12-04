import * as fs from 'fs';
import {Board} from "./board";
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
const input = fileContent.split(/\r?\n/)
const numbers = input.slice(0,1)[0].split(",").map(numberString => Number(numberString))
console.log(numbers)

const boards: Board[] = input.slice(2,input.length).join("\n").split(/\n{2}/)
    .map(boardString => new Board(
        boardString.split("\n")
            .map(row =>
                row.split(" ")
                .filter(value => value)
                .map(value => Number(value))
            )
        )
    )
console.log(boards)

let winnerBoard = null;
let winningNumber = 0;
for (const number of numbers) {
    console.log(number)
    for (const board of boards) {
        if(!board.winningNumber){
            board.crossNumberAndCheckWin(number)
            winnerBoard = board;
            winningNumber = number;
        }
    }
    if(number === 15) break;
}
console.log(winnerBoard)
console.log(winnerBoard!.sumOfUnmarked())
console.log(winningNumber)
console.log(winningNumber * winnerBoard!.sumOfUnmarked())
