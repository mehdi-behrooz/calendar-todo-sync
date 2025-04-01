class ArrayUtils {

  static deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr))
  }

}

function testDeepCopy() {

  const now = new Date();
  const arr = [
    10,
    "MY_STRING",
    now,
    now.toISOString(),
    { name: "NAME" }
  ]

  const copy = ArrayUtils.deepCopy(arr);
  arr[4].name = "NAME_EDITED";

  TestUtils.assertLength(copy, 5);
  TestUtils.assertTrue(copy[0], 10);
  TestUtils.assertTrue(copy[1], "MY_STRING");
  TestUtils.assertTrue(copy[2], now);
  TestUtils.assertTrue(copy[3], now.toISOString);
  TestUtils.assertTrue(copy[4].name, "NAME");

}
