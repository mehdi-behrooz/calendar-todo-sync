function testTodoistTask() {

  let task, tasks;

  const originalSize = TodoistAPI.getTasks().length;

  task = TodoistAPI.createTask(new TodoistTask("TEST_TITLE_1", "TEST_DESCRIPTION_1", false, "2025-03-31T00:00:00+03:30", "EVENT_ID"));
  TestUtils.assertTrue  (task.id);
  TestUtils.assertEquals(task.title, "TEST_TITLE_1");
  TestUtils.assertEquals(task.description, "TEST_DESCRIPTION_1");
  TestUtils.assertEquals(task.allDay, false);
  TestUtils.assertEquals(task.datetime, "2025-03-30T20:30:00Z");

  tasks = TodoistAPI.getTasks();
  TestUtils.assertLength(tasks, originalSize + 1);

  task.title = "TEST_TITLE_1_EDITED";
  task = TodoistAPI.updateTask(task);
  TestUtils.assertEquals(task.title, "TEST_TITLE_1_EDITED");

  tasks = TodoistAPI.getTasks();
  TestUtils.assertLength(tasks, originalSize + 1);

  TodoistAPI.deleteTask(task);
  tasks = TodoistAPI.getTasks();
  TestUtils.assertLength(tasks, originalSize);

}

function testTodoistAllDayTask() {

  let task, tasks;

  task = TodoistAPI.createTask(new TodoistTask("TEST_TITLE_2", "TEST_DESCRIPTION_2", true, "2025-03-31", "EVENT_ID"));
  TestUtils.assertTrue  (task.id);
  TestUtils.assertEquals(task.title, "TEST_TITLE_2");
  TestUtils.assertEquals(task.description, "TEST_DESCRIPTION_2");
  TestUtils.assertEquals(task.allDay, true);
  TestUtils.assertEquals(task.datetime, "2025-03-31");

  tasks = TodoistAPI.getTasks();

  TodoistAPI.deleteTask(task);

}
