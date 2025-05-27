document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  fetch('/_data/meetups.json')
    .then(response => response.json())
    .then(meetups => {
      var events = [];
      var now = new Date();
      meetups.forEach(meetup => {
        // Only handle monthly, last weekday recurrence for now
        if (meetup.schedule.frequency === 'monthly' && meetup.schedule.day.startsWith('last')) {
          var weekday = meetup.schedule.day.split(' ')[1].toLowerCase();
          var weekdayNum = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'].indexOf(weekday);
          // Generate next 6 months of events
          for (let i = 0; i < 6; i++) {
            let d = getLastWeekdayOfMonth(now.getFullYear(), now.getMonth() + i, weekdayNum, meetup.schedule.time);
            events.push({
              title: meetup.group + ' Meetup',
              start: d,
              description: meetup.description,
              url: meetup.location.online,
              extendedProps: {
                location: meetup.location.in_person,
                type: meetup.location.type
              }
            });
          }
        }
      });
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: events,
        eventClick: function(info) {
          info.jsEvent.preventDefault();
          var event = info.event;
          var details =
            '<strong>' + event.title + '</strong><br>' +
            (event.extendedProps.type ? 'Type: ' + event.extendedProps.type + '<br>' : '') +
            (event.extendedProps.location ? 'Location: ' + event.extendedProps.location + '<br>' : '') +
            (event.start ? 'When: ' + event.start.toLocaleString() + '<br>' : '') +
            (event.url ? '<a href="' + event.url + '" target="_blank">Join Link</a><br>' : '') +
            (event.extendedProps.description ? event.extendedProps.description : '');
          // Simple modal
          var modal = document.createElement('div');
          modal.innerHTML = '<div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;">' +
            '<div style="background:#fff;padding:2em;border-radius:8px;max-width:400px;">' + details + '<br><button id="closeModal">Close</button></div></div>';
          document.body.appendChild(modal);
          document.getElementById('closeModal').onclick = function() {
            document.body.removeChild(modal);
          };
        }
      });
      calendar.render();
    });
});

// Helper to get the last weekday (0=Sun) of a month at a given time
function getLastWeekdayOfMonth(year, month, weekday, time) {
  var d = new Date(year, month + 1, 0); // last day of month
  while (d.getDay() !== weekday) {
    d.setDate(d.getDate() - 1);
  }
  var [hours, minutes] = time.split(':');
  d.setHours(parseInt(hours), parseInt(minutes));
  return d;
} 