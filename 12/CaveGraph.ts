import {Graph} from "../utils/Graph";

export class CaveGraph extends Graph{
    constructor() {
        super()
    }

    findAllPaths(start, end, isNodeValidDestinationForNextStep?: (node: string, curPath: string[]) => boolean) {
        isNodeValidDestinationForNextStep =
            isNodeValidDestinationForNextStep
            ?? ((node, curPath) => curPath.find(element => element === node) === undefined)
        // Create an array to keep track of the current path
        const currentPath = [];
        // Create an array to store all the final paths
        const finalPaths = [];
        // Helper function to find all the paths
        const findPaths = (node: string): void => {
            // Push the current node to the currentPath array
            currentPath.push(node);
            // Check if the current node is the end node and return if so
            if (node === end) {
                // If so, add the current path to finalPaths and return
                finalPaths.push([...currentPath]);
                currentPath.pop();
                return;
            }
            // Otherwise, recursively traverse the path-branches created by the possibilities to continue via the adjacent nodes
            const adjacentNodes = this.adjList[node];
            // Loop through the adjacent nodes
            for (let node of adjacentNodes) {
                // Skip this neighbour by early stopping this single loop execution if the node cannot be visited anymore
                if (!isNodeValidDestinationForNextStep(node, currentPath)) continue;
                // Otherwise, call findPaths on the current node
                findPaths(node);
            }
            // Pop the current node from the currentPath array
            currentPath.pop();
        }

        // Start the algorithm
        findPaths(start);
        // Return the final paths
        return finalPaths;
    }
}