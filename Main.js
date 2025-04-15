function main() {

  Cache.init(Constants.CACHE_KEY, Constants.CACHE_SIZE);

  const today = DateUtils.getToday();
  const tomorrow = DateUtils.getTomorrow();
  const events = GCalendarAPI.fetchEvents(today, tomorrow);

  if (Constants.GTASKS_ENABLED) {
    GTasksSynchronizer.sync(ArrayUtils.deepCopy(events));
  }

  if (Constants.TODOIST_ENABLED) {
    TodoistSynchronizer.sync(ArrayUtils.deepCopy(events));
  }

}
