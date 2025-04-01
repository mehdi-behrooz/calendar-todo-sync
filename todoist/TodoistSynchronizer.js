class TodoistSynchronizer {

  static sync(events) {

    console.log("Current Cache:")
    console.log(Cache.list());

    console.log("Syncing with Todoist...");

    const tasks = TodoistAPI.getTasks();

    this._syncEventsToTasks(events, tasks);

    this._deleteInvalidTasks(events, tasks);

  }

  static _syncEventsToTasks(events, tasks) {

    for (let event of events) {

      const linkedTask = tasks.find(task => task.eventId === event.id);

      const newTask = new TodoistTask(event.title, event.description, event.allDay, event.datetime, event.id);

      if (! linkedTask) {
        if (Cache.has(event.id)) {
          console.log(`Event id ${event.id} found in cache. Skipping...`);
        } else {
          console.log(`Event id ${event.id} not found in cache. Creating new task...`);
          TodoistAPI.createTask(newTask);
          Cache.add(event.id);
          console.log(`Task with title ${newTask.title} created. Event id ${event.id} has been added to cache.`);
        }
        continue;
      }

      if (! linkedTask.equals(newTask)) {
        newTask.id = linkedTask.id;
        TodoistAPI.updateTask(newTask);
        console.log(`Task with title ${newTask.title} updated.`);
        continue;
      }

    }

  }

  static _deleteInvalidTasks(events, tasks) {

    for (let task of tasks) {

      const event = task.eventId ? events.find(event => event.id === task.eventId) : null;

      if (! event) {
        TodoistAPI.deleteTask(task);
        console.log(`Task with title ${task.title} deleted (invalid event id).`);
        Cache.delete(task.eventId);
        continue;
      }

      if (event.linked) {
        TodoistAPI.deleteTask(task);
        console.log(`Task with title ${task.title} deleted (duplicate event id).`);
        continue;
      }

      event.linked = true;

    }

  }

}
