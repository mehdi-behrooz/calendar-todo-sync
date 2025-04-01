class GTasksSynchronizer {

  static sync(events) {

    console.log("Syncing GTasks...");

    const list = GTasksAPI.getOrCreateList(Constants.GTASK_LIST_NAME);

    let tasks = GTasksAPI.getTasks(list.id);

    this._syncEventsToTasks(events, tasks, list.id);

    this._deleteInvalidTasks(events, tasks);

    tasks = GTasksAPI.getTasks(list.id);

    this._sortTasks(events, tasks);

  }

  static _syncEventsToTasks(events, tasks, listId) {

    for (let event of events) {

      const linkedTask = tasks.find(task => task.eventId === event.id);

      const newTask = new GTask(event.title, event.description, event.datetime, event.id, listId);

      if (! linkedTask) {
        GTasksAPI.createTask(newTask);
        console.log(`Task with title ${newTask.title} created.`);
        continue;
      }

      if (! linkedTask.equals(newTask)) {
        newTask.id = linkedTask.id;
        GTasksAPI.updateTask(newTask);
        console.log(`Task with title ${newTask.title} updated.`);
        continue;
      }

    }

  }

  static _deleteInvalidTasks(events, tasks) {

    for (let task of tasks) {

      const event = task.eventId ? events.find(event => event.id === task.eventId) : null;

      if (! event) {
        GTasksAPI.deleteTask(task);
        console.log(`Task with title ${task.title} deleted (invalid event id).`);
        continue;
      }

      if (event.linked) {
        GTasksAPI.deleteTask(task);
        console.log(`Task with title ${task.title} deleted (duplicate event id).`);
        continue;
      }

      event.linked = true;

    }

  }

  static _sortTasks(events, tasks) {

    tasks = tasks.filter(task => task.status === 'pending');
    tasks.forEach(task => task.event = events.find(event => event.id === task.eventId));
    const tasksSortedByDate = tasks.concat().sort((a, b) => b.event.allDay - a.event.allDay || a.event.datetime.localeCompare(b.event.datetime));

    if (JSON.stringify(tasks.map(t => t.id)) !== JSON.stringify(tasksSortedByDate.map(t => t.id))) {
      console.log("Orders are wrong. Fixing the order...");
      tasksSortedByDate.reduce((previousTask, task) => { GTasksAPI.moveTask(task, previousTask); return task; }, null);
    }

  }


}
