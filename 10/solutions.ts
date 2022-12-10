import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
const bracketRows = fileContent.split(/\r?\n/).map(stringRow => stringRow.split(''))

const openCloseMap = new Map([
    ['(', ')'],
    ['{', '}'],
    ['<', '>'],
    ['[', ']'],
])
const syntaxPointsMap = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
])
const isOpeningSymbol = (symbol) => openCloseMap.has(symbol)

const scores = []
const leftOverStacks = []
bracketRows.forEach(bracketList => {
    const openStack = []
    let found = false
    bracketList.forEach((symbol, index) => {
        if(isOpeningSymbol(symbol)){
            openStack.push(symbol)
        } else {
            // no opening symbol -> closing symbol -> has to close the upper most opening symbol on the stack
            const braceToClose = openStack.pop()
            const expectedClosingSymbol = openCloseMap.get(braceToClose);
            if(!found && (expectedClosingSymbol !== symbol || !braceToClose)){
                scores.push(syntaxPointsMap.get(symbol))
                found = true;
            }
        }
    })
    if(!found) leftOverStacks.push(openStack)
})
console.log(scores.reduce((sum, value) => sum+value))

/*
* Part 2 ->
* */

const closeLists = []
leftOverStacks.map(stack => {
    const closeSymbols = []
    while(stack.length > 0){
        const nextToClose = stack.pop()
        closeSymbols.push(openCloseMap.get(nextToClose))
    }
    closeLists.push(closeSymbols)
})
const completionPointsMap = new Map([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4],
])
const score = (array) =>  array.length > 1 ? 5 * score(array.slice(0,array.length-1)) + array[array.length-1] : array[0]

//console.log(score([2,1,3,4]))
const autocompleteScores = closeLists
    .map(closeList => closeList.map(symbol => completionPointsMap.get(symbol)))
    .map(scoresList => score(scoresList))
    .sort((a,b) => b-a)

console.log(autocompleteScores[Math.floor(autocompleteScores.length/2)])