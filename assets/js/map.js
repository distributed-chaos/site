// Global map variable for theme updates
let globalMap;

// Initialize the map
function initMap() {
    // Check if map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Map element not found');
        return null;
    }

    var map = L.map('map').setView([39.8283, -98.5795], 4); // Center on USA

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

    // Store map in global variable for theme updates
    globalMap = map;

    // Initialize the map style
    updateMapStyle();

    return map;
}

// Function to update map style based on theme
function updateMapStyle() {
    if (!globalMap) return;
    
    const isDark = document.body.classList.contains('theme-dark')
    
    if (window.currentTileLayer) {
        globalMap.removeLayer(window.currentTileLayer);
    }
    
    if (isDark) {
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
    window.currentTileLayer.addTo(globalMap);
}

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

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initMap();
    
    // Set up theme observer
    const observer = new MutationObserver(function() {
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
}); 
