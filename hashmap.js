import { LinkedList } from "./linkedLists.js";
const ll = new LinkedList();

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }
    return hashCode;
  }

  print() {
    for (let i = 0; i < this.buckets.length; i++) console.log(this.buckets[i]);
    return this.buckets;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    // add new pair
    if (this.buckets[hashCode] === undefined) {
      const ll = new LinkedList();
      ll.append({ key, value });
      this.buckets[hashCode] = ll;
    }
    // Update existing value of the key or add new key,value pair
    else {
      const ll = this.buckets[hashCode];
      let existingNode = ll.findNodeByKey(key);

      if (existingNode) {
        existingNode.value.value = value;
      } else {
        // Add new node in linked list at last
        ll.append({ key, value });
      }
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const ll = this.buckets[hashCode];

    if (ll === undefined) return false;

    const node = ll.findNodeByKey(key);
    if (node !== null) return node.value.value;
    return false;
  }

  has(key) {
    const hashCode = this.hash(key);
    const ll = this.buckets[hashCode];

    if (ll === undefined) return false;
    else {
      if (ll.findNodeByKey(key)) return true;
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const ll = this.buckets[hashCode];

    if (ll === undefined) return false;

    return ll.removeNodeByKey(key);
  }

  length() {
    let totalKeys = 0;
    for (let bucket = 0; bucket < this.capacity; bucket++) {
      let ll = this.buckets[bucket];

      if (ll !== undefined) {
        let currentNode = ll.getHead();
        while (currentNode !== null) {
          totalKeys += 1;
          currentNode = currentNode.nextNode;
        }
      }
    }
    return totalKeys;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  keys() {
    let keysList = [];
    for (let bucket = 0; bucket < this.capacity; bucket++) {
      let ll = this.buckets[bucket];

      if (ll !== undefined) {
        let currentNode = ll.getHead();
        while (currentNode !== null) {
          keysList.push(currentNode.value.key);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return keysList;
  }

  values() {
    let valuesList = [];
    for (let bucket = 0; bucket < this.capacity; bucket++) {
      let ll = this.buckets[bucket];

      if (ll !== undefined) {
        let currentNode = ll.getHead();
        while (currentNode !== null) {
          valuesList.push(currentNode.value.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return valuesList;
  }

  entries() {
    let entriesList = [];
    for (let bucket = 0; bucket < this.capacity; bucket++) {
      let ll = this.buckets[bucket];

      if (ll !== undefined) {
        let currentNode = ll.getHead();
        while (currentNode !== null) {
          entriesList.push([currentNode.value.key, currentNode.value.value]);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return entriesList;
  }
}

const map = new HashMap();
map.set("shivam", 6);
map.set("abc", 3);
map.set("stuv", 39);
map.set("efghi", 5);
map.set("efghi", 23);
console.log(map.entries());
