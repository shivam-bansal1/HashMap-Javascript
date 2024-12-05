class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.buckets = new Array(this.capacity).fill(-1);
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

  get() {
    for (let i = 0; i < this.buckets.length; i++) console.log(this.buckets[i]);
    return this.buckets;
  }

  set(key, value) {
    const hashCode = this.hash(key);

    // add new pair
    if (this.buckets[hashCode] == -1) {
      this.buckets[hashCode] = { [key]: value };
    }
    // Update existing value of the key
    else if (this.buckets[hashCode][key] !== undefined) {
      this.buckets[hashCode][key] = value;
    }
  }
}

const map = new HashMap();
map.set("shivam", 6);
map.set("abc", 3);
map.set("efghi", 5);
map.get();
map.set("efghi", 123);
map.get();
map.set("efghi", 0);
map.get();
