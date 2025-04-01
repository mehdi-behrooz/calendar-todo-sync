# Calendar Tasks Synchronizer

## Intro
Once deployed on Google Apps Script, it synchronizes Google Calendar events to Google Tasks as well as Todoist.

## Deploy
Enable Apps Script API in [Google Apps Script settings](https://script.google.com/home/usersettings) and then:
```bash
apt install npm
npm install @google/clasp -g
clasp login
clasp push
```

## Configuration

You can configure the script by putting these key/value pairs in script properties:

- `TODOIST_TOKEN`: The authentication token to access Todoist.
- `CALENDAR_NAMES`: The list of calendar names whoose events should be synced, in JSON array format. All calendars will be used if missing.

