function main() {

  Cache.init(Constants.CACHE_KEY, Constants.CACHE_SIZE);

  const today = DateUtils.getToday();
  const tommorow = DateUtils.getTomorrow();
  const events = GCalendarAPI.fetchEvents(today, tommorow);

  if (Constants.GTAKS_ENABLED) {
    GTasksSynchronizer.sync(ArrayUtils.deepCopy(events));
  }

  if (Constants.TODOIST_ENABLED) {
    TodoistSynchronizer.sync(ArrayUtils.deepCopy(events));
  }

}
