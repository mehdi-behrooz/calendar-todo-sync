class Properties {

  static get(key, defaultValue) {
    var value = PropertiesService.getUserProperties().getProperty(key);
    return value ? JSON.parse(value) : defaultValue;
  }

  static set(key, value) {
      PropertiesService.getUserProperties().setProperty(key, JSON.stringify(value));
  }

}

class ScriptProperties {

  static get(key, defaultValue) {
    var value = PropertiesService.getScriptProperties().getProperty(key);
    if (! value) {
      return defaultValue;
    }
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

}


function testProperties() {

  let value;

  Properties.set("test", "123");
  value = Properties.get("test");
  TestUtils.assertEquals(value, "123");
  TestUtils.assertType  (value, "string");

  Properties.set("test", 123);
  value = Properties.get("test");
  TestUtils.assertEquals(value, 123);
  TestUtils.assertType  (value, "number");

  Properties.set("test", {a: "22", b: 33});
  value = Properties.get("test");
  TestUtils.assertType  (value, "object");
  TestUtils.assertEquals(value.a, "22");
  TestUtils.assertType  (value.a, "string");
  TestUtils.assertEquals(value.b, 33);
  TestUtils.assertType  (value.b, "number");

}
