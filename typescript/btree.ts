/**
 * BTree data structure
 * A node is connected to other nodes
 * Nodes have names/values
 * Number of connections are not constant
 * 
 * data Tree<T>(payload: T, leftBranch: Tree, rightBranch: Tree)
 * data BTree<T>(payload: T, nodes: Array<BTree<T>>)
 */

class BTree<T> {
    value: T // that's gonna be used for our evaluation function in Beam Search algorithm
    adjacentNodes: Array<BTree<T>>
    constructor(value: T, ...nodes: Array<BTree<T>>) {
        this.value = value
        this.adjacentNodes = nodes
    }
    toString() {
        return `BTree(${this.value}, ${this.adjacentNodes.map(n => n.toString)})`
    }
}

console.log(new BTree(1,
                new BTree(2, new BTree(5)),
                new BTree(3,
                    new BTree(6),
                    new BTree(7)),
                new BTree(4)))

