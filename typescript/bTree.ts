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
    value: T
    adjacentNodes: Array<BTree<T>>
    constructor(value: T, ...nodes: Array<BTree<T>>) {
        this.value = value
        this.adjacentNodes = nodes || []
    }

    toString() {
        return `BTree(${this.value}, ${this.adjacentNodes.map(n => n.toString())})`
    }

    hasValueDFS(value: T) {
        const dfs = (value: T, node: BTree<T>) => {            
            const res = node.adjacentNodes.map(x => {
                console.log(x.adjacentNodes)
                if(x.adjacentNodes === []) return false

                if (x.value == value) {
                    return true
                } else {
                    return dfs(value, x)
                }
            })

            console.log(res) // why the fuck does it get undefined values in a fuckin list??

            res
        }

        return dfs(value, this)
    }
}

let tree = new BTree(1,
          new BTree(2, new BTree(5)),
          new BTree(3,
              new BTree(6),
              new BTree(7)),
          new BTree(4))

console.log(tree)

// console.log(tree.hasValueDFS(5))

