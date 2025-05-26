---
layout: single
title: Local Groups
permalink: /groups/
---

<style>
#group-search {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid var(--text-color);
    border-radius: 12px;
    font-size: 16px;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all 0.3s ease;
}

#group-search::placeholder {
    color: var(--text-color);
    opacity: 0.7;
}

#group-search:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(var(--primary-color-rgb), 0.3);
}

.group-item {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    transition: all 0.3s ease;
    background-color: var(--background-color);
}

.group-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-color: var(--primary-color);
}
</style>

## Active Groups

<input type="text" id="group-search" placeholder="Search for groups..." onkeyup="filterGroups()">

<div id="groups-list">
  <div class="group-item">
    <h3><a href="https://defcon202.org/">DC202 - Washington DC</a></h3>
  </div>
  <div class="group-item">
    <h3><a href="https://dc423.org">DC423 - Chattanooga, TN</a></h3>
  </div>
</div>

<script>
function filterGroups() {
    var input = document.getElementById('group-search');
    var filter = input.value.toLowerCase();
    var groups = document.getElementsByClassName('group-item');

    for (var i = 0; i < groups.length; i++) {
        var groupText = groups[i].textContent || groups[i].innerText;
        if (groupText.toLowerCase().indexOf(filter) > -1) {
            groups[i].style.display = "";
        } else {
            groups[i].style.display = "none";
        }
    }
}
</script>

## Start a Group

Starting a local group is easy:

1. Read our [framework principles](/framework/)
2. Join our [GitHub organization](https://github.com/distributed-chaos)
3. Submit a pull request to add your group here

## Group Directory

*Coming soon - be the first to add your group!*

<!-- 
Format for adding groups:
- [Group Name (City, State/Region)] - Brief description
  - Meeting frequency: e.g., Monthly
  - Typical location: e.g., Downtown area
  - Contact: [Social link or contact method]
-->

