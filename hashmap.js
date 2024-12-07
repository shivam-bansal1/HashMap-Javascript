import { LinkedList } from "./linkedLists.js";
const ll = new LinkedList();

export class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this.keyCount = 0; // Maintains the count of keys in HashMap
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

    // Double the hashmap as it reaches load factor
    if (this.length() / this.capacity >= this.loadFactor) {
      this.growBuckets();
    }
    // add new pair
    if (this.buckets[hashCode] === undefined) {
      const ll = new LinkedList();
      ll.append({ key, value });
      this.buckets[hashCode] = ll;
      this.keyCount++;
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
        this.keyCount++;
      }
    }
  }

  growBuckets() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.keyCount = 0;

    for (let i = 0; i < oldBuckets.length; i++) {
      const ll = oldBuckets[i];

      if (ll !== undefined) {
        let currentNode = ll.getHead();
        while (currentNode !== null) {
          const { key, value } = currentNode.value;
          this.set(key, value);
          currentNode = currentNode.nextNode;
        }
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

    this.keyCount--;
    return ll.removeNodeByKey(key);
  }

  length() {
    return this.keyCount;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.keyCount = 0;
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
