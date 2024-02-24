// darktimes calendar
// note that these variables are global across all files in this project
const calendarId = 'YOUR-CALENDAR-ID-HERE@group.calendar.google.com';
const calendar = CalendarApp.getCalendarById(calendarId);

// san francisco
const latitude = 37.7749;
const longitude = -122.4194;

// make a test event
function createTestEvent() {
  calendar.createAllDayEvent("testEvent", new Date());
}

// Date format: YYYY-MM-DDTHH:mm:ss.sssZ

// make all dark times for the current month
function createDarkTimesForMonth() {
  // get current month
  const today = new Date();
  const thisMonth = today.getUTCMonth();
  const thisYear = today.getUTCFullYear();
  const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();

  // calculate each darktime and create event
  for (let day = 1; day < daysInMonth; day++) {
    //YYYY-MM-DD
    const date = day.toString().padStart(2, "0");
    const tomorrowDate = (day + 1).toString().padStart(2, "0");

    const formattedDate = `${thisYear}-${(thisMonth + 1).toString().padStart(2, "0")}-${date}`;
    let formattedTomorrowDate = `${thisYear}-${(thisMonth + 1).toString().padStart(2, "0")}-${tomorrowDate}`;

    const sunsetTime = getSunsetTime(formattedDate);
    const sunriseTime = getSunriseTime(formattedTomorrowDate);

    const sunsetDateString = formattedDateTime(formattedDate, formatTime(sunsetTime));
    const sunriseDateString = formattedDateTime(formattedTomorrowDate, formatTime(sunriseTime));

    calendar.createEvent("darktimes", new Date(sunsetDateString), new Date(sunriseDateString));
  }

  function getSunsetTime(date) {
    let url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}`
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    return data.results.sunset;
  }

  function getSunriseTime(date) {
    let url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}`
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    return data.results.sunrise;
  }

  // input time is formatted like "5:00:59 PM" 
  // output time is like "17:00:59"
  function formatTime(time) {
    let timeString = time.split(' ')[0].padStart(8, '0');
    const timeOfDay = time.split(' ')[1];

    // convert to 24 hour time
    if (timeOfDay === "PM") {
      let hour = parseInt(timeString.split(':')[0]);
      hour += 12;
      timeString = hour.toString() + timeString.slice(2);
    }

    return timeString;
  }

  // timezone is PST
  function formattedDateTime (formattedDate, formattedTime) {
    return `${formattedDate}T${formattedTime}-08:00`
  }
}




