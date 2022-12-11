import {getOneInstanceOfEachDuplicatedElement} from "./utils";

export class Graph {
    adjList: {};

    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        if (!this.adjList[vertex]) this.adjList[vertex] = [];
    }

    addEdge(vertex1, vertex2) {
        this.adjList[vertex1].push(vertex2);
        this.adjList[vertex2].push(vertex1);
    }

    removeEdge(vertex1, vertex2) {
        this.adjList[vertex1] = this.adjList[vertex1].filter(
            (v) => v !== vertex2
        );
        this.adjList[vertex2] = this.adjList[vertex2].filter(
            (v) => v !== vertex1
        );
    }

    removeVertex(vertex) {
        while (this.adjList[vertex].length) {
            const adjacentVertex = this.adjList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjList[vertex];
    }

    depthFirstSearch(start) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);

        return result;
    }

    breadthFirstSearch(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjList[currentVertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }

    nonCyclicPaths(start, end) {
        let paths = [];
        let visited = new Set();
        let queue = [[start]];

        while (queue.length > 0) {
            let path = queue.shift();
            let node = path[path.length - 1];

            if (node === end) {
                paths.push(path);
            }

            if (visited.has(node)) {
                continue;
            }

            visited.add(node);

            for (let neighbor of this.adjList[node]) {
                let newPath = [...path, neighbor];
                queue.push(newPath);
            }
        }
        return paths;
    }
}