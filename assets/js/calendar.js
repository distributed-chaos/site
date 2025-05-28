document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  // Add loading indicator
  calendarEl.innerHTML = '<p>Loading calendar events...</p>';

  // Fetch events from the new events.json endpoint
  fetch('/_data/events.json')
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Events data loaded:', data);
      var events = [];
      var now = new Date();
      
      // Process recurring events
      if (data.recurring_events && Array.isArray(data.recurring_events)) {
        data.recurring_events.forEach(event => {
          try {
            var recurringEvents = generateRecurringEvents(event, now, 12); // Generate 12 months ahead
            events = events.concat(recurringEvents);
          } catch (error) {
            console.error('Error processing recurring event:', event, error);
          }
        });
      }
      
      // Process one-time events
      if (data.one_time_events && Array.isArray(data.one_time_events)) {
        data.one_time_events.forEach(event => {
          try {
            var eventDate = new Date(event.date + 'T' + event.start_time);
            var endDate = event.end_time && event.end_time !== "" ? new Date(event.date + 'T' + event.end_time) : null;
            
            events.push({
              id: event.id,
              title: event.title,
              start: eventDate,
              end: endDate,
              backgroundColor: event.color || '#3788d8',
              borderColor: event.color || '#3788d8',
              extendedProps: {
                group: event.group,
                description: event.description,
                location: event.location,
                contact: event.contact,
                registration: event.registration,
                prerequisites: event.prerequisites,
                tags: event.tags,
                eventType: 'one_time'
              }
            });
          } catch (error) {
            console.error('Error processing one-time event:', event, error);
          }
        });
      }

      console.log('Total events processed:', events.length);

      // Initialize FullCalendar
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        events: events,
        eventClick: function(info) {
          info.jsEvent.preventDefault();
          showEventModal(info.event);
        },
        eventMouseEnter: function(info) {
          // Add hover effect
          info.el.style.cursor = 'pointer';
          info.el.style.opacity = '0.8';
        },
        eventMouseLeave: function(info) {
          info.el.style.opacity = '1';
        },
        height: 'auto',
        eventDisplay: 'block',
        dayMaxEvents: 3,
        moreLinkClick: 'popover'
      });
      
      calendar.render();
      
      // Add category filter buttons
      if (data.categories && Array.isArray(data.categories)) {
        addCategoryFilters(data.categories, calendar, events);
      }
    })
    .catch(error => {
      console.error('Error loading events:', error);
      calendarEl.innerHTML = `
        <div class="calendar-error">
          <h4>Error Loading Calendar</h4>
          <p>There was an error loading the calendar events. Please check the browser console for details.</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <p>Try refreshing the page or contact the site administrator if the problem persists.</p>
        </div>
      `;
    });
});

// Generate recurring events based on pattern
function generateRecurringEvents(event, startDate, monthsAhead) {
  var events = [];
  var currentDate = new Date(startDate);
  
  if (!event.recurrence || !event.recurrence.type || !event.recurrence.pattern || !event.recurrence.time) {
    console.warn('Invalid recurrence data for event:', event);
    return events;
  }
  
  for (let i = 0; i < monthsAhead; i++) {
    var eventDates = [];
    
    try {
      if (event.recurrence.type === 'monthly') {
        eventDates = getMonthlyEventDates(currentDate.getFullYear(), currentDate.getMonth() + i, event.recurrence.pattern, event.recurrence.time);
      } else if (event.recurrence.type === 'weekly') {
        eventDates = getWeeklyEventDates(currentDate.getFullYear(), currentDate.getMonth() + i, event.recurrence.pattern, event.recurrence.time);
      }
      
      eventDates.forEach(date => {
        if (date >= startDate) { // Only include future events
          events.push({
            id: event.id + '_' + date.getTime(),
            title: event.title,
            start: date,
            backgroundColor: event.color || '#3788d8',
            borderColor: event.color || '#3788d8',
            extendedProps: {
              group: event.group,
              description: event.description,
              location: event.location,
              contact: event.contact,
              tags: event.tags,
              eventType: 'recurring',
              recurrence: event.recurrence
            }
          });
        }
      });
    } catch (error) {
      console.error('Error generating dates for recurring event:', event, error);
    }
  }
  
  return events;
}

// Get monthly event dates (e.g., "last Wednesday", "first Monday")
function getMonthlyEventDates(year, month, pattern, time) {
  var parts = pattern.toLowerCase().split(' ');
  var occurrence = parts[0]; // "first", "second", "third", "fourth", "last"
  var dayName = parts[1]; // "monday", "tuesday", etc.
  var dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(dayName);
  
  var [hours, minutes] = time.split(':');
  var dates = [];
  
  if (occurrence === 'last') {
    var lastDay = new Date(year, month + 1, 0);
    while (lastDay.getDay() !== dayOfWeek) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    lastDay.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    dates.push(new Date(lastDay));
  } else {
    var occurrenceNum = ['first', 'second', 'third', 'fourth'].indexOf(occurrence) + 1;
    var firstDay = new Date(year, month, 1);
    var firstOccurrence = new Date(firstDay);
    
    // Find first occurrence of the day
    while (firstOccurrence.getDay() !== dayOfWeek) {
      firstOccurrence.setDate(firstOccurrence.getDate() + 1);
    }
    
    // Add weeks to get to the desired occurrence
    firstOccurrence.setDate(firstOccurrence.getDate() + (occurrenceNum - 1) * 7);
    
    // Check if it's still in the same month
    if (firstOccurrence.getMonth() === month) {
      firstOccurrence.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      dates.push(new Date(firstOccurrence));
    }
  }
  
  return dates;
}

// Get weekly event dates
function getWeeklyEventDates(year, month, dayName, time) {
  var dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(dayName.toLowerCase());
  var [hours, minutes] = time.split(':');
  var dates = [];
  
  var date = new Date(year, month, 1);
  
  // Find first occurrence of the day in the month
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }
  
  // Add all occurrences in the month
  while (date.getMonth() === month) {
    var eventDate = new Date(date);
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    dates.push(eventDate);
    date.setDate(date.getDate() + 7);
  }
  
  return dates;
}

// Show detailed event modal
function showEventModal(event) {
  var props = event.extendedProps;
  var modalContent = `
    <div class="event-modal-overlay" onclick="closeEventModal()">
      <div class="event-modal" onclick="event.stopPropagation()">
        <div class="event-modal-header">
          <h2>${event.title}</h2>
          <button class="close-btn" onclick="closeEventModal()">&times;</button>
        </div>
        <div class="event-modal-body">
          ${props.group ? `<p><strong>Group:</strong> ${props.group}</p>` : ''}
          
          <div class="event-datetime">
            <strong>When:</strong> ${formatEventDateTime(event)}
          </div>
          
          ${props.location ? formatLocationInfo(props.location) : ''}
          
          ${props.description ? `<div class="event-description"><strong>Description:</strong><br>${props.description}</div>` : ''}
          
          ${props.registration ? formatRegistrationInfo(props.registration) : ''}
          
          ${props.prerequisites ? `<p><strong>Prerequisites:</strong> ${props.prerequisites}</p>` : ''}
          
          ${props.contact ? formatContactInfo(props.contact) : ''}
          
          ${props.tags ? `<div class="event-tags">${props.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
          
          ${props.eventType === 'recurring' && props.recurrence ? `<p class="recurrence-info"><em>This is a ${props.recurrence.type} event (${props.recurrence.pattern})</em></p>` : ''}
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalContent);
}

function formatEventDateTime(event) {
  var start = event.start;
  var end = event.end;
  
  var dateStr = start.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  var timeStr = start.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  if (end && end.getDate() === start.getDate()) {
    var endTimeStr = end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return `${dateStr} from ${timeStr} to ${endTimeStr}`;
  }
  
  return `${dateStr} at ${timeStr}`;
}

function formatLocationInfo(location) {
  var html = '<div class="event-location"><strong>Location:</strong><br>';
  
  if (location.type === 'hybrid') {
    html += '<em>Hybrid Event</em><br>';
  } else if (location.type === 'online') {
    html += '<em>Online Event</em><br>';
  }
  
  if (location.venue) {
    html += `<strong>Venue:</strong> ${location.venue}<br>`;
  }
  
  if (location.address) {
    html += `<strong>Address:</strong> ${location.address}<br>`;
  }
  
  if (location.online_link) {
    html += `<strong>${location.online_platform || 'Online'}:</strong> <a href="${location.online_link}" target="_blank">Join Link</a><br>`;
  }
  
  html += '</div>';
  return html;
}

function formatRegistrationInfo(registration) {
  var html = '<div class="event-registration"><strong>Registration:</strong><br>';
  
  if (registration.required) {
    html += '<em>Registration required</em><br>';
  }
  
  if (registration.cost) {
    html += `<strong>Cost:</strong> ${registration.cost}<br>`;
  }
  
  if (registration.link) {
    html += `<a href="${registration.link}" target="_blank" class="register-btn">Register Now</a><br>`;
  }
  
  html += '</div>';
  return html;
}

function formatContactInfo(contact) {
  var html = '<div class="event-contact"><strong>Contact:</strong><br>';
  
  if (contact.organizer) {
    html += `<strong>Organizer:</strong> ${contact.organizer}<br>`;
  }
  
  if (contact.email) {
    html += `<strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a><br>`;
  }
  
  if (contact.website) {
    html += `<strong>Website:</strong> <a href="${contact.website}" target="_blank">${contact.website}</a><br>`;
  }
  
  html += '</div>';
  return html;
}

function closeEventModal() {
  var modal = document.querySelector('.event-modal-overlay');
  if (modal) {
    modal.remove();
  }
}

// Add category filter functionality
function addCategoryFilters(categories, calendar, allEvents) {
  var filterContainer = document.createElement('div');
  filterContainer.className = 'calendar-filters';
  filterContainer.innerHTML = '<h3>Filter by Category:</h3>';
  
  // Add "All" button
  var allBtn = document.createElement('button');
  allBtn.textContent = 'All Events';
  allBtn.className = 'filter-btn active';
  allBtn.onclick = () => {
    calendar.removeAllEvents();
    calendar.addEventSource(allEvents);
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    allBtn.classList.add('active');
  };
  filterContainer.appendChild(allBtn);
  
  // Add category buttons
  categories.forEach(category => {
    var btn = document.createElement('button');
    btn.textContent = category.name;
    btn.className = 'filter-btn';
    btn.style.borderColor = category.color;
    btn.onclick = () => {
      var filteredEvents = allEvents.filter(event => 
        event.extendedProps.tags && event.extendedProps.tags.includes(category.id)
      );
      calendar.removeAllEvents();
      calendar.addEventSource(filteredEvents);
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
    };
    filterContainer.appendChild(btn);
  });
  
  // Insert before calendar
  document.getElementById('calendar').parentNode.insertBefore(filterContainer, document.getElementById('calendar'));
} 