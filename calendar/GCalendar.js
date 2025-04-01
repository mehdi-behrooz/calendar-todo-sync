class GCalendarEvent {

  constructor(json) {

    this.id = json.id;
    this.title = json.summary;
    this.description = json.description || '';

    if (json.start.dateTime) {

      this.allDay = false;
      this.datetime = json.start.dateTime;

    } else {

      this.allDay = true;
      this.datetime = DateUtils.isoDate(json.start.date);

    }

  }

}

class GCalendarAPI {

  static fetchEvents(since, until) {

    let calendars = Calendar.CalendarList.list().items;

    const calendarNames = ScriptProperties.get("CALENDAR_NAMES");
    if (calendarNames) {
      calendars = calendars.filter(c => calendarNames.includes(c.summary));
    }

    const parameters = { timeMin: since, timeMax: until, singleEvents: true }
    const items = calendars.flatMap(c => Calendar.Events.list(c.id, parameters).items);
    const events = items.map(item => new GCalendarEvent(item));
    return events;

  }

}


function testGCalendarAPI() {

  let events = GCalendarAPI.fetchEvents(DateUtils.getToday(), DateUtils.getTomorrow());
  console.log(events);

}
