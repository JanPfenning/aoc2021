import * as fs from 'fs';
import {getOneInstanceOfEachDuplicatedElement} from "../utils/utils";
import {CaveGraph} from "./CaveGraph";
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
const connectionStringsList = fileContent.split(/\r?\n/)//.forEach(line => console.log(line))

const graph: CaveGraph = new CaveGraph();
const connections = connectionStringsList.map(line => line.split('-'))
connections.forEach(([from, to]) => {
    graph.addVertex(from)
    graph.addVertex(to)
    graph.addEdge(from, to)
})
console.log(graph)
console.log(graph.nonCyclicPaths('start', 'end'))

/* Part 1 */
const allowUpperCaseLetterNodesToAlwaysBeVisited = (node, currentPath): boolean => {
    return node === node.toUpperCase() // node is a big cave - those can be visited infinite times
        || currentPath.find(element => element === node) === undefined // (now known to be small cave) node is not yet visited
}
console.log(graph.findAllPaths('start', 'end', allowUpperCaseLetterNodesToAlwaysBeVisited).length)

/* Part 2 */
const allowOneLowerCaseLetterNodeToBeVisitedTwice = (node: string, currentPath: string[]): boolean => {
    return getOneInstanceOfEachDuplicatedElement(currentPath) // get all caves visited more than once
            .filter(element => element === element.toLowerCase()) // filter all the big ones out and keep the small duplicates
            .length === 0 // if no small duplicates found - we can still revisit one
        && node !== 'start' && node !== 'end'// but only if its neither the start nor the end cave
}
console.log(graph.findAllPaths('start', 'end', (node: string, curPath: string[]) => allowUpperCaseLetterNodesToAlwaysBeVisited(node, curPath) || allowOneLowerCaseLetterNodeToBeVisitedTwice(node, curPath)).length)
