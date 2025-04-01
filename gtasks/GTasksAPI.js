class GTasksAPI {

  static createList(title) {
    return Tasks.Tasklists.insert({title: title});
  }

  static getList(title) {
    return Tasks.Tasklists.list().items.find(l => l.title === title);
  }

  static deleteListById(listId) {
    Tasks.Tasklists.remove(listId);
  }

  static deleteListByTitle(title) {
    const list = this.getList(title);
    list && this.deleteListById(list.id);
  }

  static getOrCreateList(title) {
    return this.getList(title) || this.createList(title);
  }

  static getTasks(listId) {
    const items = Tasks.Tasks.list(listId, {showHidden: "true", showCompleted: "true"}).items;
    items.sort((a, b) => a.position - b.position);
    return items.map(item => GTask.fromJSON(item).setListId(listId));
  }

  static createTask(task) {
    const item = Tasks.Tasks.insert(task.toJSON(), task.listId);
    return GTask.fromJSON(item).setListId(task.listId);
  }

  static updateTask(task) {
    const item = Tasks.Tasks.patch(task.toJSON(), task.listId, task.id);
    return GTask.fromJSON(item).setListId(task.listId);
  }

  static deleteTask(task) {
    Tasks.Tasks.remove(task.listId, task.id);
  }

  static moveTask(task, previous_task) {
    let params = previous_task ? {previous: previous_task.id} : {};
    Tasks.Tasks.move(task.listId, task.id, params);
  }

}
