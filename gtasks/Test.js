function testAddRemoveLists() {

  let list;

  list = GTasksAPI.getOrCreateList("Test");
  TestUtils.assertTrue  (list);
  TestUtils.assertTrue  (list.id);
  TestUtils.assertEquals(list.title, "Test");

  list = GTasksAPI.getList("Test");
  TestUtils.assertTrue  (list);
  TestUtils.assertTrue  (list.id);
  TestUtils.assertEquals(list.title, "Test");

  GTasksAPI.deleteListById(list.id);

  list = GTasksAPI.getList("Test");
  TestUtils.assertFalse  (list);

}

function testAddRemoveTasks() {

  GTasksAPI.deleteListByTitle("Test");
  const list = GTasksAPI.createList("Test");
  let tasks;

  tasks = GTasksAPI.getTasks(list.id);
  TestUtils.assertLength(tasks, 0);

  GTasksAPI.createTask(new GTask("T1", "D1", "2025-03-31T00:00:00+03:30", "EVENT1", list.id));
  GTasksAPI.createTask(new GTask("T2", "D2", "2025-03-31", "EVENT2", list.id));

  tasks = GTasksAPI.getTasks(list.id).sort((a, b) => a.title.localeCompare(b.title));;

  TestUtils.assertLength(tasks, 2);

  TestUtils.assertTrue  (tasks[0].id);
  TestUtils.assertEquals(tasks[0].title, "T1");
  TestUtils.assertEquals(tasks[0].description, "D1");
  TestUtils.assertEquals(tasks[0].status, "pending");
  TestUtils.assertEquals(tasks[0].date, "2025-03-31");
  TestUtils.assertEquals(tasks[0].listId, list.id);
  TestUtils.assertEquals(tasks[0].eventId, "EVENT1");

  TestUtils.assertTrue  (tasks[1].id);
  TestUtils.assertEquals(tasks[1].listId, list.id);
  TestUtils.assertEquals(tasks[1].title, "T2");
  TestUtils.assertEquals(tasks[1].description, "D2");
  TestUtils.assertEquals(tasks[1].status, "pending");
  TestUtils.assertEquals(tasks[1].date, "2025-03-31");
  TestUtils.assertEquals(tasks[1].listId, list.id);
  TestUtils.assertEquals(tasks[1].eventId, "EVENT2");

  tasks[0].title = "T0_edited";
  GTasksAPI.updateTask(tasks[0]);

  tasks = GTasksAPI.getTasks(list.id).sort((a, b) => a.title.localeCompare(b.title));;
  TestUtils.assertLength(tasks, 2);
  TestUtils.assertEquals(tasks[0].title, "T0_edited");
  TestUtils.assertEquals(tasks[0].listId, list.id);

  GTasksAPI.deleteTask(tasks[1]);

  tasks = GTasksAPI.getTasks(list.id).sort((a, b) => a.title.localeCompare(b.title));;
  TestUtils.assertLength(tasks, 1);
  TestUtils.assertEquals(tasks[0].title, "T0_edited");

  GTasksAPI.deleteListById(list.id);

}

function testMoveTasks() {

  GTasksAPI.deleteListByTitle("Test");
  const list = GTasksAPI.createList("Test");
  let tasks;

  const t2 = GTasksAPI.createTask(new GTask("T2", null, null, null, list.id));
  const t1 = GTasksAPI.createTask(new GTask("T1", null, null, null, list.id));
  const t4 = GTasksAPI.createTask(new GTask("T4", null, null, null, list.id));
  const t3 = GTasksAPI.createTask(new GTask("T3", null, null, null, list.id));

  GTasksAPI.moveTask(t1);
  GTasksAPI.moveTask(t2, t1);
  GTasksAPI.moveTask(t3, t2);
  GTasksAPI.moveTask(t4, t3);

  tasks = GTasksAPI.getTasks(list.id);
  TestUtils.assertLength(tasks, 4);
  TestUtils.assertEquals(tasks[0].title, "T1");
  TestUtils.assertEquals(tasks[1].title, "T2");
  TestUtils.assertEquals(tasks[2].title, "T3");
  TestUtils.assertEquals(tasks[3].title, "T4");

  GTasksAPI.moveTask(t4);
  GTasksAPI.moveTask(t3, t4);
  GTasksAPI.moveTask(t2, t3);
  GTasksAPI.moveTask(t1, t2);

  tasks = GTasksAPI.getTasks(list.id);
  TestUtils.assertLength(tasks, 4);
  TestUtils.assertEquals(tasks[0].title, "T4");
  TestUtils.assertEquals(tasks[1].title, "T3");
  TestUtils.assertEquals(tasks[2].title, "T2");
  TestUtils.assertEquals(tasks[3].title, "T1");

  GTasksAPI.deleteListById(list.id);

}
