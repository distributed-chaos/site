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
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.group-item {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
}

.group-item:hover {
    background-color: #f8f9fa;
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

