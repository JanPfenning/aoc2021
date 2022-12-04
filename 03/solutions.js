import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const transpose = arr => {
    let res = [];
    res = arr.reduce((acc, val, ind) => {
        val.forEach((el, index) => {
            acc[index] = acc[index] || [];
            acc[index][ind] = el;
        });
        return acc;
    }, [])
    return res;
};

const x = fileContent.split(/\r?\n/)
    .map(line => line.split(""))//.map(bit => bit==='1'))

const transposedMatrix = transpose(x)
const gammaResultLine = transposedMatrix.map(column => column.filter(bit => bit === '1').length > column.length/2 ? 1: 0)
const epsilonResultLine = gammaResultLine.map(bit => bit === 1 ? 0 : 1)
console.log(gammaResultLine.join(""))
console.log(epsilonResultLine.join(""))
const gamma = parseInt(gammaResultLine.join(""), 2)
const epsilon = parseInt(epsilonResultLine.join(""), 2)
console.log(gamma * epsilon)

/*
* part 2 oxygen and co2
* */
const getMostFrequentValueInColumn = (colIndex, remainingRows) => {
    const transposed = transpose(remainingRows)
    return transposed[colIndex].filter(bit => bit === '1').length >= transposed[colIndex].length/2 ? '1' : '0'
}
const findMostMatchingValue = (columnIndex, mostFrequentBoolean, remainingRows) => {
    if(remainingRows.length === 1) return remainingRows[0]
    const newRows = remainingRows.filter(
        row => row[columnIndex] === (mostFrequentBoolean
            ? getMostFrequentValueInColumn(columnIndex, remainingRows)
            : (getMostFrequentValueInColumn(columnIndex, remainingRows) === '1' ? '0' : '1')
        )
    )
    return findMostMatchingValue(columnIndex+1, mostFrequentBoolean, newRows);
}
const o2 = findMostMatchingValue(0, true, x)
console.log(o2.join(""))

const co2 = findMostMatchingValue(0, false, x)
console.log(co2.join(""))

console.log(parseInt(o2.join(""), 2) * parseInt(co2.join(""), 2))