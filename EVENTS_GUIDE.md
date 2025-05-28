# Events Guide

This guide explains how to add events to the Distributed Chaos community calendar. Our calendar system makes it easy for anyone to contribute events and help build a vibrant community.

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Edit** the `_data/events.yml` file
3. **Add** your event under either `recurring_events` or `one_time_events`
4. **Follow** the examples and structure below
5. **Submit** a pull request

## 📋 Contributing Process

### Step 1: Fork and Clone
```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Distributed-Chaos.git
cd Distributed-Chaos
```

### Step 2: Create a Branch
```bash
# Create a new branch for your event
git checkout -b add-my-event-name
```

### Step 3: Add Your Event
Edit `_data/events.yml` and add your event following the templates below.

### Step 4: Test Locally (Optional)
```bash
# Install dependencies and run Jekyll locally
bundle install
bundle exec jekyll serve
# Visit http://localhost:4000/calendar/ to test
```

### Step 5: Submit Pull Request
```bash
# Commit your changes
git add _data/events.yml
git commit -m "Add [Event Name] to calendar"
git push origin add-my-event-name
# Create pull request on GitHub
```

## 📅 Event Types

### Recurring Events

Use this for regular meetups, weekly events, monthly gatherings, etc.

```yaml
recurring_events:
  - id: unique_event_id
    title: "Event Title"
    group: "Group Name"
    description: >
      Multi-line description of the event.
      Use the > character for multi-line text.
    recurrence:
      type: "monthly"  # or "weekly"
      pattern: "last Wednesday"  # See patterns below
      time: "18:30"  # 24-hour format
      timezone: "America/New_York"
    location:
      type: "hybrid"  # "in_person", "online", or "hybrid"
      venue: "Venue Name"
      address: "Full address"
      online_link: "https://discord.gg/example"
      online_platform: "Discord"  # Discord, Zoom, Jitsi, etc.
    contact:
      organizer: "Organizer Name"
      email: "contact@example.org"
      website: "https://example.org"
    tags: ["security", "networking"]  # See categories below
    color: "#ff6b6b"  # Hex color for calendar display
```

### One-Time Events

Use this for conferences, workshops, special events, etc.

```yaml
one_time_events:
  - id: unique_event_id
    title: "Event Title"
    group: "Group Name"
    description: >
      Event description here.
    date: "2025-06-15"  # YYYY-MM-DD format
    start_time: "09:00"  # 24-hour format
    end_time: "18:00"    # Optional
    timezone: "America/New_York"
    location:
      type: "in_person"
      venue: "Convention Center"
      address: "123 Main St, City, State 12345"
    contact:
      organizer: "Event Team"
      email: "info@event.org"
      website: "https://event.org"
    registration:
      required: true
      link: "https://eventbrite.com/register"
      cost: "$50"  # or "Free"
    prerequisites: "Basic computer skills"  # Optional
    tags: ["conference", "education"]
    color: "#ff9f43"
```

## 🔄 Recurrence Patterns

For recurring events, use these patterns:

### Monthly Events
- `"first Monday"`
- `"second Tuesday"`
- `"third Wednesday"`
- `"fourth Thursday"`
- `"last Friday"`
- `"last Saturday"`

### Weekly Events
- `"Monday"`
- `"Tuesday"`
- `"Wednesday"`
- `"Thursday"`
- `"Friday"`
- `"Saturday"`
- `"Sunday"`

## 📍 Location Types

- **`in_person`**: Physical location only
- **`online`**: Virtual event only
- **`hybrid`**: Both physical and virtual attendance options

## 🏷️ Event Categories/Tags

Use these predefined tags for proper categorization:

- `security` - Security & Privacy events
- `maker` - Maker & Hardware events
- `software` - Software Development events
- `social` - Social & Networking events
- `education` - Education & Workshops

You can also use specific technology tags like:
- `hacking`, `cryptography`, `privacy`
- `electronics`, `3d-printing`, `arduino`
- `python`, `javascript`, `web-development`
- `networking`, `community`, `meetup`

## 🎨 Color Codes

Choose colors that match your event type:

- **Security/Hacking**: `#ff6b6b` (red)
- **Maker/Hardware**: `#4ecdc4` (teal)
- **Software**: `#45b7d1` (blue)
- **Social**: `#96ceb4` (green)
- **Education**: `#a55eea` (purple)
- **Conferences**: `#ff9f43` (orange)

## ✅ Required vs Optional Fields

### Required for All Events
- `id` - Unique identifier (use lowercase, underscores)
- `title` - Event name
- `group` - Organizing group
- `description` - Event description

### Required for Recurring Events
- `recurrence.type`
- `recurrence.pattern`
- `recurrence.time`

### Required for One-Time Events
- `date`
- `start_time`

### Optional Fields
- `location.*` (but recommended)
- `contact.*` (but recommended)
- `registration.*`
- `prerequisites`
- `tags`
- `color`
- `timezone` (defaults to America/New_York)

## 📝 Examples

### Simple Monthly Meetup

```yaml
- id: dc_security_meetup
  title: "DC Security Meetup"
  group: "DC Security Group"
  description: "Monthly gathering for security professionals and enthusiasts."
  recurrence:
    type: "monthly"
    pattern: "first Thursday"
    time: "19:00"
  location:
    type: "in_person"
    venue: "Tech Hub"
    address: "456 Tech St, Washington, DC"
  tags: ["security", "networking"]
```

### Online Workshop

```yaml
- id: crypto_basics_workshop
  title: "Cryptography Basics Workshop"
  group: "CryptoParty DC"
  description: "Learn the fundamentals of cryptography in this hands-on workshop."
  date: "2025-07-20"
  start_time: "14:00"
  end_time: "16:00"
  location:
    type: "online"
    online_link: "https://meet.jit.si/crypto-workshop"
    online_platform: "Jitsi Meet"
  registration:
    required: true
    link: "https://forms.gle/example"
    cost: "Free"
  tags: ["education", "cryptography"]
```

### Hybrid Conference

```yaml
- id: defcon_dc_2025
  title: "DEF CON DC 2025"
  group: "DEF CON DC"
  description: >
    Annual cybersecurity conference featuring talks, workshops, 
    and networking opportunities for security professionals.
  date: "2025-08-15"
  start_time: "09:00"
  end_time: "18:00"
  location:
    type: "hybrid"
    venue: "Convention Center"
    address: "789 Convention Ave, Washington, DC"
    online_link: "https://stream.defcondc.org"
    online_platform: "Live Stream"
  contact:
    organizer: "DEF CON DC Team"
    email: "info@defcondc.org"
    website: "https://defcondc.org"
  registration:
    required: true
    link: "https://defcondc.org/register"
    cost: "$75 in-person, $25 virtual"
  tags: ["conference", "security", "networking"]
  color: "#ff6b6b"
```

## 💡 Best Practices

### Event Descriptions
- **Be Clear**: Explain what attendees will learn or do
- **Include Prerequisites**: Mention any required skills or knowledge
- **Set Expectations**: Describe the format (hands-on, lecture, discussion)
- **Mention Audience**: Who should attend (beginners, experts, etc.)

### Contact Information
- **Always Include**: At least one way for people to get in touch
- **Use Group Emails**: Prefer group/organization emails over personal ones
- **Include Websites**: Link to your group's main website or event page

### Location Details
- **Be Specific**: Include full addresses for in-person events
- **Test Links**: Ensure online meeting links work before submitting
- **Accessibility**: Mention if venues are wheelchair accessible
- **Parking**: Include parking information for in-person events

### Registration
- **Clear Costs**: Be upfront about any fees
- **Registration Deadlines**: Mention if there are cutoff dates
- **Capacity Limits**: Note if space is limited

## 🔧 Tips

1. **Use Descriptive IDs**: Make them lowercase with underscores (`dc_security_meetup`)
2. **Write Clear Descriptions**: Help people understand what to expect
3. **Include Contact Info**: Make it easy for people to get in touch
4. **Test Your YAML**: Use a YAML validator to check syntax
5. **Be Consistent**: Follow the existing patterns in the file
6. **Update Regularly**: Keep recurring event details current

## 🐛 Troubleshooting

### Common Issues

1. **YAML Syntax Errors**: 
   - Check indentation (use spaces, not tabs)
   - Ensure proper nesting
   - Use quotes around strings with special characters

2. **Date/Time Format**: 
   - Use YYYY-MM-DD for dates
   - Use 24-hour format (HH:MM) for times
   - Include timezone information

3. **Missing Required Fields**: 
   - Every event needs `id`, `title`, `group`, `description`
   - Recurring events need `recurrence` details
   - One-time events need `date` and `start_time`

### Validation Tools
- [YAML Validator](https://yamlchecker.com/)
- [JSON Formatter](https://jsonformatter.curiousconcept.com/)

## 🆘 Getting Help

### Before Submitting
- Check existing events in `_data/events.yml` for examples
- Validate your YAML syntax online
- Test locally if possible (see Step 4 above)

### Need Assistance?
- **GitHub Issues**: Open an issue for questions or problems
- **Community Chat**: Ask in the community Discord/Slack
- **Email**: Contact the maintainers directly
- **Documentation**: Check the README.md for additional info

### Pull Request Guidelines
- **Clear Title**: Use descriptive PR titles like "Add CryptoParty Workshop"
- **Description**: Explain what event you're adding and why
- **Single Event**: One event per pull request when possible
- **Test First**: Verify your YAML is valid before submitting

## 🤝 Community Guidelines

### Event Inclusion Criteria
- **Relevant**: Events should be related to technology, security, making, or community building
- **Open**: Events should be open to community members (not private/corporate only)
- **Local**: Focus on DC metro area events, but virtual events welcome
- **Appropriate**: Follow community standards and code of conduct

### Content Standards
- **Accurate Information**: Ensure all details are correct and up-to-date
- **Professional Tone**: Use clear, professional language in descriptions
- **Inclusive Language**: Welcome all skill levels and backgrounds
- **No Spam**: Don't use the calendar for promotional content only

### Maintenance
- **Keep Updated**: Update or remove events that are cancelled or changed
- **Respond to Issues**: Be available to fix problems with your events
- **Community First**: Prioritize community benefit over self-promotion

## 📊 Event Analytics

After your event is added, you can track:
- **Calendar Views**: How many people view the calendar
- **Event Clicks**: How often people click on your event
- **Registration Clicks**: Clicks through to registration links

## 🎯 Success Tips

### Promote Your Event
- **Social Media**: Share the calendar link
- **Mailing Lists**: Include calendar in newsletters
- **Cross-Post**: Share in relevant communities
- **Word of Mouth**: Encourage attendees to check the calendar

### Engage the Community
- **Follow Up**: Add photos or summaries after events
- **Feedback**: Ask for suggestions on improving events
- **Collaborate**: Partner with other groups for joint events
- **Mentor**: Help newcomers add their first events
---

## 🙏 Thank You!

Thank you for contributing to the Distributed Chaos community calendar! Your events help build a stronger, more connected community of makers, hackers, and technologists.

**Happy Contributing!** 🎉 
