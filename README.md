# Calendar Tasks Synchronizer

## Intro
Once deployed on Google Apps Script, it synchronizes Google Calendar events to Google Tasks as well as Todoist.

## Configuration

You can configure the script by putting these key/value pairs in script properties:

- `TODOIST_TOKEN`: The authentication token to access Todoist.
- `CALENDAR_NAMES`: The list of calendar names whoose events should be synced, in JSON array format. All calendars will be used if missing.

