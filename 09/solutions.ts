import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const checkerBoard = fileContent.split(/\r?\n/).map(line => line.split("").map(element => Number(element)))
const lowSpots = []
for (let i = 0; i < checkerBoard.length; i++) {
    for (let j = 0; j < checkerBoard[0].length; j++) {
        const height = checkerBoard[i][j]
        if(
            height < (checkerBoard[i-1] ? checkerBoard[i-1][j] : 10) &&
            height < (checkerBoard[i][j-1] ?? 10) &&
            height < (checkerBoard[i+1] ? checkerBoard[i+1][j] : 10) &&
            height < (checkerBoard[i][j+1] ?? 10)
        ) lowSpots.push([i,j])
    }
}
//console.log(lowSpots)
const result = lowSpots.map(([i,j]) => checkerBoard[i][j] + 1).reduce((sum, value) => sum + value)
console.log(result) //493 too low

for (let i = 0; i < checkerBoard.length; i++) {
    for (let j = 0; j < checkerBoard[0].length; j++) {
        if(checkerBoard[i][j] === 9) break;
        const lineBasin = [checkerBoard[i][j]]
        for (let k = j; k < checkerBoard[0].length; k++) {
            if(checkerBoard[i][k] === 9) break;
            lineBasin.push(checkerBoard[i][k])
        }
    }
}

/*const getLineBasins = (line) => {
    line = line.reverse();
    const lineBasins = [[]]
    while(line.length>0){
        const element = line.pop()
        if(element === 9) lineBasins.push([])
        else if(lineBasins[lineBasins.length-1][0]===9) lineBasins.push([])
        lineBasins[lineBasins.length-1].push(element)
    }
    return lineBasins.filter(basin => basin.length>0)
}
console.log(getLineBasins("9976557856799875679875642456989998767978931098989876587878999876565667896543210123567899876794310234".split("").map(element => Number(element))))
*/

function biggestGroupOfZeros(matrix) {
    let basins = [];
    let visited = new Set();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0 && !visited.has([i,j].toString())) {
                let count = explore(matrix, i, j, visited);
                basins.push(count);
            }
        }
    }

    return basins;
}

function explore(matrix, i, j, visited) {
    if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] !== 0 || visited.has([i,j].toString())) {
        return 0;
    }

    visited.add([i,j].toString());
    let count = 1;

    count += explore(matrix, i + 1, j, visited);
    count += explore(matrix, i - 1, j, visited);
    count += explore(matrix, i, j + 1, visited);
    count += explore(matrix, i, j - 1, visited);

    return count;
}

const checkerBoardForFloodfill = fileContent.split(/\r?\n/).map(line => line.split("").map(element => Number(element)!==9 ? 0 : 1))
console.log(checkerBoardForFloodfill)
const result2 = biggestGroupOfZeros(checkerBoardForFloodfill).sort((a,b) => b-a).slice(0,3)
console.log(result2)
console.log(result2.reduce((sum, value)=>sum*value)) //288 is too low