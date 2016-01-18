
var config = require("../config/config.reminder");
var cronJob = require('cron').CronJob;
var _currentWeekNumber = require('current-week-number');
var moment = require('moment');
var inArray = require('in-array');
var isOdd = require('is-odd');

var getCountdown = function(eventTime) {
  var startDateTime = moment();
  var endDateTime = eventTime;
  var timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);

  var hours = Math.floor(moment.duration(timeLeft).asHours());
  endDateTime = endDateTime.subtract(hours, 'hours');
  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);

  var minutes = Math.floor(moment.duration(timeLeft).asMinutes());
  endDateTime = endDateTime.subtract(minutes, 'minutes');
  timeLeft = endDateTime.diff(startDateTime, 'milliseconds', true);

  var seconds = Math.floor(moment.duration(timeLeft).asSeconds());

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  return hours + ':' + minutes + ':' + seconds;
};

var sendEvent = function(title, countdown, show, effect) {
  send_event(config.eventName, {
    title: title,
    countdown: countdown,
    show: show,
    effect: effect,
    reminderPosition: config.reminderPosition
  });
};

new cronJob(config.cronInterval, function(){
  var currentTime = moment();
  var currentWeekNumber = _currentWeekNumber();
  var currentWeekDay = currentTime.weekday();

  var title = '';
  var countdown = '';
  var show = false;
  var effect = false;

  config.events.forEach(function(event) {
    if (!inArray(event.wday, currentWeekDay)) {
      return;
    }

    if (event.weekrythm) {
      if (
          (event.weekrythm == 'even' && isOdd(currentWeekNumber))
          ||
          (event.weekrythm == 'odd' && !isOdd(currentWeekNumber))
      ) {
        return;
      }
    }

    var eventTime = moment().hour(event.hour).minute(event.min).second(0);
    if (!eventTime.isValid()) {
      console.log('EventTime is not valid');
      return;
    }

    var preReminderTime = eventTime.clone().subtract(config.preReminderMin, 'minutes');
    if (currentTime > preReminderTime && currentTime < eventTime) {
      effect = false;
      show = true;
      title = event.name;
      countdown = getCountdown(eventTime);
      if (currentTime.seconds() == 0) {
        effect = true;
      }
      return;
    }

    var postReminderTime = eventTime.clone().add(config.postReminderMin, 'minutes');
    if (currentTime >= eventTime && currentTime <= postReminderTime) {
      title = event.name;
      countdown = 'NOW';
      show = true;
      return;
    }
  });
  sendEvent(title, countdown, show, false);
}, null, true, null);