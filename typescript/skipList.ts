
class SkipListNode {
  element: int
  right: SkipListNode
  down: SkipListNode

  constructor(x: int, rt: SkipListNode, dw: SkipListNode) {
    this.element = x
    this.right = rt
    this.down = dw
  }
}

/**
 * TODO: implement lookup by index
 */
class SkipList {

  private head: SkipListNode
  private inf: int
  private bottom: SkipListNode = null
  private tail: SkipListNode = null

  constructor(max: int) {
    this.inf = max
    this.bottom = new SkipListNode(0, null, null)
    this.bottom.right = this.bottom.down = this.bottom
    this.tail = new SkipListNode(this.inf, null, null)
    this.tail.right = this.tail
    this.head = new SkipListNode(this.inf, this.tail, this.bottom)
  }

  insert(x: int) {
    let current: SkipListNode = this.head
    this.bottom.element = x

    while (current !== this.bottom) {
      while (current.element < x) {
        current = current.right      
      }
      if (current.down.right.right.element < current.element) {
        current.right = new SkipListNode(current.element, current.right,
                                    current.down.right.right)
        current.element = current.down.right.element
      } else {
        current = current.down
      }
    }
    if (this.head.right !== this.tail) {
      this.head = new SkipListNode(this.inf, this.tail, this.head)
    }
  }

  insertMany(xs: Array<int>) {
    xs.forEach(element => this.insert(element))
  }

  toArray(): Array<int> {
    let current: SkipListNode = this.head
    let result: Array<int> = []
    while (current.down !== this.bottom) {
      current = current.down
    }
    while (current.right !== this.tail) {
      result.push(current.element)
      current = current.right
    }
    return result
  }

  makeEmpty() {
    this.head.right = this.tail
    this.head.down = this.bottom
  }

  isEmpty(): bool {
    return this.head.right === this.tail && this.head.down === this.bottom
  }
}

const slist = new SkipList(1000)
slist.insertMany([12, 41, 525, 63, 744, 412, 52, 636, 74, 124, 214, 52, 78])
console.log(slist.toArray())
