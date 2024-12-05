class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    let newNode = new Node(value);
    newNode.nextNode = null;

    if (this.head === null) {
      this.tail = this.head = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
  }

  prepend(value) {
    let newNode = new Node(value);
    newNode.nextNode = null;

    if (this.head === null) {
      this.tail = this.head = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
  }

  size() {
    let currentNode = this.head,
      numberOfNodes = 0;

    while (currentNode !== null) {
      numberOfNodes += 1;
      currentNode = currentNode.nextNode;
    }
    return numberOfNodes;
  }

  getHead() {
    if (this.head === null) return null;
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index) {
    if (this.head === null) return "Index out of range! The list is empty.";

    let iterator = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (iterator === index) {
        return currentNode.value;
      }
      iterator++;
      currentNode = currentNode.nextNode;
    }
    return `Index out of range! . Size of list is ${this.size()}`;
  }

  pop() {
    if (this.head === null) return "The list is empty.";

    let previousNode = this.head;
    while (previousNode.nextNode !== this.tail)
      previousNode = previousNode.nextNode;

    previousNode.nextNode = null;
    this.tail = previousNode;
  }

  contains(value) {
    if (this.head === null) return false;
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    if (this.head === null) return null;
    let index = 0;

    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return index;
      }
      index++;
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  insertAt(value, index) {
    if (index > this.size())
      return `Index out of range! . Size of list is ${this.size()}`;

    if (index === 0) this.prepend(value);
    else if (index === this.size()) this.append(value);
    else {
      let previousNode = this.head,
        iterator = 0;

      while (iterator !== index - 1) {
        previousNode = previousNode.nextNode;
        iterator += 1;
      }

      let newNode = new Node(value);
      newNode.nextNode = previousNode.nextNode;
      previousNode.nextNode = newNode;
    }

    return `Node added successfully at index: ${index}`;
  }

  removeAt(index) {
    if (this.head === 0)
      return "Listt is already empty! Can't remove from empty list.";

    if (index > this.size() - 1)
      return `Index out of range! . Size of list is ${this.size()}`;

    // Remove first node
    if (index === 0) this.head = this.head.nextNode;
    // Remove last node
    else if (index === this.size() - 1) {
      let previousNode = this.head;

      while (previousNode.nextNode != this.tail) {
        previousNode = previousNode.nextNode;
      }

      previousNode.nextNode = null;
      this.tail = previousNode;
    } else {
      let previousNode = this.head,
        iterator = 0;

      while (iterator !== index - 1) {
        previousNode = previousNode.nextNode;
        iterator += 1;
      }

      previousNode.nextNode = previousNode.nextNode.nextNode;
    }

    return `Node successfully removed from index: ${index}`;
  }

  toString() {
    if (this.head === null) return "The list is empty.";

    let resultString = "";
    let currentNode = this.head;

    while (currentNode !== null) {
      resultString += `( ${currentNode.value} ) --> `;
      currentNode = currentNode.nextNode;
    }

    resultString += "null";
    return resultString;
  }
}
