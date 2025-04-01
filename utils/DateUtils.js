class DateUtils {

  static getToday() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return this.isoDateTime(date);
  }

  static getTomorrow() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    return this.isoDateTime(date);
  }

  static getAfterTomorrow() {
    var date = new Date();
    date.setDate(date.getDate() + 2);
    date.setHours(0, 0, 0, 0);
    return this.isoDateTime(date);
  }

  static isoDateTime(date) {
    date = date instanceof Date ? date : new Date(date);
    return date.toISOString().substring(0, 19) + "Z";
  }

  static isoDate(date) {
    date = date instanceof Date ? date : new Date(date);
    return date.toISOString().substring(0, 10);
  }

}

function testDateUtils() {

  var date;

  date = DateUtils.getToday();
  TestUtils.assertType  (date, "string");
  TestUtils.assertLength(date, "20");

  date = DateUtils.getAfterTomorrow();
  TestUtils.assertType  (date, "string");
  TestUtils.assertLength(date, "20");

  date = DateUtils.isoDateTime(new Date());
  TestUtils.assertType  (date, "string");
  TestUtils.assertLength(date, "20");

  date = DateUtils.isoDateTime(new Date().toISOString());
  TestUtils.assertType  (date, "string");
  TestUtils.assertLength(date, "20");

  date = DateUtils.isoDate(new Date());
  TestUtils.assertType  (date, "string");
  TestUtils.assertLength(date, "10");

  date = DateUtils.isoDate(new Date().toISOString());
  TestUtils.assertType  (date, "string");
  TestUtils.assertLength(date, "10");

}
