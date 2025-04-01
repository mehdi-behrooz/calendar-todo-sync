class Cache {

  static init(key, size) {
    this.key = key;
    this.size = size;
  }

  static _getCache() {
    if (! this.key) {
      throw new Error("Cache has not initialized.");
    }
    return Properties.get(this.key);
  }

  static _setCache(cache) {
    if (! this.key) {
      throw new Error("Cache has not initialized.");
    }
    Properties.set(this.key, cache);
  }

  static add(x) {
    let cache = this._getCache();
    if (cache.includes(x)) {
      return;
    }
    if (cache.length >= this.size) {
      cache.shift();
    }
    cache.push(x);
    this._setCache(cache);
  }

  static delete(x) {
    let cache = this._getCache();
    cache = cache.filter(t => t !== x);
    this._setCache(cache);
  }

  static list() {
    return this._getCache();
  }

  static has(x) {
    let cache = this._getCache();
    return cache.includes(x);
  }

  static clear() {
    this._setCache([]);
  }

}

function testAddDelete() {

  Cache.init("TEST_CACHE_KEY", 10);

  Cache.clear();
  TestUtils.assertLength(Cache.list(), 0);

  Cache.add("a");
  Cache.add("b");
  Cache.add("c");
  TestUtils.assertTrue  (Cache.has("a"));
  TestUtils.assertTrue  (Cache.has("b"));
  TestUtils.assertTrue  (Cache.has("c"));
  TestUtils.assertLength(Cache.list(), 3);

  Cache.delete("b");
  TestUtils.assertTrue  (Cache.has("a"));
  TestUtils.assertFalse  (Cache.has("b"));
  TestUtils.assertTrue  (Cache.has("c"));
  TestUtils.assertLength(Cache.list(), 2);

}

function testMaxSize() {

  Cache.init("TEST_CACHE_KEY", 2);

  Cache.clear();
  TestUtils.assertFalse (Cache.has("a"));
  TestUtils.assertFalse (Cache.has("b"));
  TestUtils.assertFalse (Cache.has("c"));
  TestUtils.assertLength(Cache.list(), 0);

  Cache.add("a");
  TestUtils.assertTrue  (Cache.has("a"));
  TestUtils.assertFalse (Cache.has("b"));
  TestUtils.assertFalse (Cache.has("c"));
  TestUtils.assertLength(Cache.list(), 1);

  Cache.add("b");
  TestUtils.assertTrue  (Cache.has("a"));
  TestUtils.assertTrue  (Cache.has("b"));
  TestUtils.assertFalse (Cache.has("c"));
  TestUtils.assertLength(Cache.list(), 2);

  Cache.add("c");
  TestUtils.assertFalse (Cache.has("a"));
  TestUtils.assertTrue  (Cache.has("b"));
  TestUtils.assertTrue  (Cache.has("c"));
  TestUtils.assertLength(Cache.list(), 2);

}
