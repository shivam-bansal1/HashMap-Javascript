import { LinkedList } from "./linkedLists.js";

export class HashSet {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    this.keyCount = 0;
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

  add(key) {
    const hashCode = this.hash(key);

    // Grow buckets if load factor is exceeded
    if (this.keyCount / this.capacity >= this.loadFactor) {
      this.growBuckets();
    }

    if (this.buckets[hashCode] === undefined) {
      const ll = new LinkedList();
      ll.append(key);
      this.buckets[hashCode] = ll;
      this.keyCount++;
    } else {
      const ll = this.buckets[hashCode];
      if (!ll.contains(key)) {
        ll.append(key);
        this.keyCount++;
      }
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    const ll = this.buckets[hashCode];

    if (ll === undefined) return false;

    return ll.contains(key);
  }

  remove(key) {
    const hashCode = this.hash(key);
    const ll = this.buckets[hashCode];

    if (ll === undefined) return false;

    if (ll.removeNodeByValue(key)) {
      this.keyCount--;
      return true;
    }
    return false;
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
          this.add(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.keyCount = 0;
  }

  size() {
    return this.keyCount;
  }

  keys() {
    let keysList = [];
    for (let bucket = 0; bucket < this.capacity; bucket++) {
      let ll = this.buckets[bucket];

      if (ll !== undefined) {
        let currentNode = ll.getHead();
        while (currentNode !== null) {
          keysList.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      }
    }
    return keysList;
  }
}
