// deletes all events on a given calendar
// be careful!

const calendarIdToDeleteFrom = 'YOUR-CALENDAR-ID-HERE@group.calendar.google.com';
const calendarToDeleteFrom = CalendarApp.getCalendarById(calendarIdToDeleteFrom);

function deleteAllEvents() {
  // Get all events from the calendar
  var events = calendarToDeleteFrom.getEvents(new Date('2000-01-01'), new Date('2030-12-31'));

  // Delete each event
  for (var i = 0; i < events.length; i++) {
    events[i].deleteEvent();
  }

  Logger.log('All events deleted successfully.');
}
