---
layout: single
title: Groups
permalink: /groups/
description: "Find and join local hacker meetups in your area, or learn how to start your own Distributed Chaos group"
keywords: "hacker groups, local meetups, join meetup, start group, hacker community, locations"
search: true
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

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

#map {
    height: 400px;
    width: 100%;
    margin: 20px 0;
    border-radius: 15px;
    border: 1px solid var(--border-color);
}
</style>

## Group Map

<div id="map"></div>

## Active Groups

<input type="text" id="group-search" placeholder="Search for groups..." onkeyup="filterGroups()">

<div id="groups-list">
  <div class="group-item">
    <h3><a href="https://defcon202.org/">DC202 - Washington DC</a></h3>
  </div>
  <div class="group-item">
    <h3><a href="https://dc423.org">DC423 - Chattanooga, TN</a></h3>
  </div>
  <div class="group-item">
    <h3><a href="https://dc407.com">DC407 - Orlando, FL</a></h3>
  </div>
  <div class="group-item">
    <h3><a href="https://dc615.org">NashSec - Nashville, TN</a></h3>
  </div>
</div>

<script>
// Initialize the map
var map = L.map('map').setView([39.8283, -98.5795], 4); // Center on USA

// Call updateMapStyle immediately after map initialization
updateMapStyle();

// Function to check if dark mode is enabled
function isDarkMode() {
    const isDark = document.body.classList.contains('dark') ||
                  document.documentElement.classList.contains('dark');
    console.log('Dark mode detected:', isDark); // Debug logging
    return isDark;
}

// Function to update map style based on theme
function updateMapStyle() {
    const darkMode = isDarkMode();
    console.log('Updating map style, dark mode:', darkMode); // Debug logging
    
    if (window.currentTileLayer) {
        map.removeLayer(window.currentTileLayer);
    }
    
    if (darkMode) {
        window.currentTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        });
    } else {
        window.currentTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        });
    }
    window.currentTileLayer.addTo(map);
}

// Create a MutationObserver to watch for theme changes
const observer = new MutationObserver(function(mutations) {
    console.log('Theme change detected'); // Debug logging
    updateMapStyle();
});

// Start observing both body and html elements for class changes
observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
});
observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
});

// Define group data with coordinates
const groups = [
    {
        name: "DC202 - Washington DC",
        url: "https://defcon202.org/",
        coords: [38.9072, -77.0369],
        description: "Washington DC area hacker group"
    },
    {
        name: "DC423 - Chattanooga",
        url: "https://dc423.org",
        coords: [35.0456, -85.3097],
        description: "Chattanooga, TN area hacker group"
    },
    {
        name: "DC407 - Orlando",
        url: "https://dc407.com",
        coords: [28.5383, -81.3792],
        description: "Orlando, FL area hacker group"
    },
    {
        name: "NashSec - Nashville",
        url: "https://dc615.org",
        coords: [36.1627, -86.7816],
        description: "Nashville, TN area hacker group"
    }
];

// Add markers for each group
groups.forEach(group => {
    L.marker(group.coords)
        .bindPopup(`
            <strong>${group.name}</strong><br>
            ${group.description}<br>
            <a href="${group.url}" target="_blank">Visit Website</a>
        `)
        .addTo(map);
});

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
