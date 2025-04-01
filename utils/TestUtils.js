class TestUtils {

  static assertTrue(assertion) {
    if (! assertion) {
      throw new Error(`Assertion failed.`);
    }
  }

  static assertFalse(assertion) {
    if (assertion) {
      throw new Error(`Assertion failed.`);
    }
  }

  static assertEquals(a, b) {
    if (a !== b) {
      throw new Error(`Assertion failed: ${a} != ${b}`);
    }
  }

  static assertType(object, type) {
    if (typeof(object) !== type) {
      throw new Error(`Assertion failed: typeof(${object}) != ${type}`);
    }
  }

  static assertLength(object, length) {
    if (! object) {
      throw new Error(`Assertion failed for length: ${object}`);
    }
    if (object.length != length) {
      throw new Error(`Assertion length(${object}) is ${object.length} instead of ${length}`);
    }
  }

}
