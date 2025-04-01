class GTask {

  constructor(title, description, date, eventId, listId) {
    this.title = title || '';
    this.description = description || '';
    this.date = date?.slice(0, 10);
    this.eventId = eventId;
    this.listId = listId;
  }

  setListId(listId) {
    this.listId = listId;
    return this;
  }

  static fromJSON(json) {
    let task = new GTask();
    task.id = json.id;
    task.title = json.title;
    task.eventId = json.notes?.match(/ID:\s*(\S+)/)?.[1];
    task.description = json.notes?.replace(/ID:\s*\S+\s*/, "").trim();
    task.date = json.due?.slice(0, 10);
    task.status = json.status === 'needsAction' ? 'pending' : 'done';
    return task;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      notes: (this.description ? this.description + "\n" : '') + `ID: ${this.eventId}`,
      due: this.date ? DateUtils.isoDateTime(this.date): null,
    }
  }

  equals(task) {
    return this.title === task.title && this.description === task.description && this.date === task.date;
  }

}
