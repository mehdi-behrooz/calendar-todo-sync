class TodoistAPI {

  static getTasks() {
    return this._callAPI('GET', `/tasks/`).map(item => TodoistTask.fromJSON(item));
  }

  static createTask(task) {
    const item = this._callAPI("POST", `/tasks/`, task.toJSON());
    return TodoistTask.fromJSON(item);
  }

  static updateTask(task) {
    if (! task.id) {
      throw new Error("Task has no id");
    }
    const item = this._callAPI("POST", `/tasks/${task.id}`, task.toJSON());
    return TodoistTask.fromJSON(item);
  }

  static deleteTask(task) {
    if (! task.id) {
      throw new Error("Task has no id");
    }
    return this._callAPI('DELETE', `/tasks/${task.id}`);
  }

  static _callAPI(method, endpoint, payload) {
    const url = `https://api.todoist.com/rest/v2${endpoint}`;
    const token = ScriptProperties.get("TODOIST_TOKEN");
    const options = {
        "method": method,
        "headers": {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        "payload": JSON.stringify(payload),
        "muteHttpExceptions": true
    };
    const response = UrlFetchApp.fetch(url, options);
    const text = response.getContentText();
    if (! text) {
      return response.getResponseCode();
    }
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

}
