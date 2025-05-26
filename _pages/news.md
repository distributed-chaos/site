---
layout: single
title: News
permalink: /news/
description: "Latest updates, announcements, and news from the Distributed Chaos hacker meetup community"
keywords: "news, updates, announcements, community news, hacker meetups, events"
search: true
---

<ul>
  {% for post in site.posts %}
    <li><a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%B %d, %Y" }}</li>
  {% endfor %}
</ul>
