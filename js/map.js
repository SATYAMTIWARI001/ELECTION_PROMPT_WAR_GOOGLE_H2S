// Leaflet Map Logic
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('timeline-map');
    const searchBtn = document.getElementById('map-search-btn');
    const searchInput = document.getElementById('map-search-input');

    if (!mapContainer || typeof L === 'undefined') return;

    // Initialize map centered on India
    let map = L.map('timeline-map').setView([20.5937, 78.9629], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let marker = null;

    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            try {
                // Fetch coordinates using OpenStreetMap Nominatim Free Geocoding API
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);

                    map.setView([lat, lon], 14);

                    if (marker) {
                        map.removeLayer(marker);
                    }

                    // Drop a pin
                    marker = L.marker([lat, lon]).addTo(map)
                        .bindPopup(`<b>Search Location</b><br>Polling stations near ${query}.`)
                        .openPopup();
                        
                    // Mock Polling Booth Logic
                    const resultDiv = document.getElementById('map-result');
                    const boothName = document.getElementById('booth-name');
                    const boothDistance = document.getElementById('booth-distance');
                    const boothAddress = document.getElementById('booth-address');
                    
                    if (resultDiv) {
                        const mockSchools = ['Govt. Primary School', 'KV High School', 'City Public College', 'Community Hall'];
                        const randomSchool = mockSchools[Math.floor(Math.random() * mockSchools.length)];
                        const randomDistance = (Math.random() * 2 + 0.5).toFixed(1);
                        
                        boothName.innerText = `Nearest Polling Booth: ${randomSchool}`;
                        boothDistance.innerText = `Distance: ${randomDistance} km away`;
                        boothAddress.innerText = data[0].display_name;
                        resultDiv.style.display = 'block';
                    }
                } else {
                    alert("Location not found. Please try a different area.");
                }
            } catch (err) {
                alert("Failed to connect to map service.");
            }
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});
