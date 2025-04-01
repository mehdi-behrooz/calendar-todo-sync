class TodoistTask {

  constructor(title, description, allDay, datetime, eventId) {
    this.title = title || '';
    this.description = description || '';
    this.allDay = allDay;
    if (datetime) {
      this.datetime = allDay ? DateUtils.isoDate(datetime) : DateUtils.isoDateTime(datetime);
    }
    this.eventId = eventId;
  }

  static fromJSON(json) {
    let task = new TodoistTask();
    task.id = json.id;
    task.title = json.content;
    task.eventId = json.description?.match(/ID:\s*(\S+)/)?.[1];
    task.description = json.description?.replace(/ID:\s*\S+\s*/, "").trim();
    if (json.due?.datetime) {
      task.allDay = false;
      task.datetime = DateUtils.isoDateTime(json.due.datetime);
    } else if (json.due?.date) {
      task.allDay = true;
      task.datetime = DateUtils.isoDate(json.due.date);
    }
    return task;
  }

  toJSON() {
    return {
      id: this.id,
      content: this.title,
      description: (this.description ? this.description + "\n" : '') + `ID: ${this.eventId}`,
      due_datetime: this.allDay ? null: this.datetime,
      due_date: this.allDay ? this.datetime: null,
    }
  }

  equals(task) {
    return this.title === task.title && this.description === task.description && this.datetime === task.datetime;
  }

}
