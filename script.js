// Heritage sites data
const heritageSites = [
    {
        id: 1,
        name: "Ancient Grand Temple",
        district: "central",
        religion: "buddhist",
        image: "https://plus.unsplash.com/premium_photo-1697730266365-0c9e80aa3739?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        description: "A magnificent temple complex dating back to the 8th century, known for its intricate carvings and spiritual significance.",
        importance: "Represents the pinnacle of ancient architectural achievement and serves as an active center for spiritual practice."
    },
    {
        id: 2,
        name: "Taj Mahal",
        district: "northern",
        religion: "all",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "A majestic fortress that once served as the seat of power for regional rulers, featuring impressive defensive structures.",
        importance: "Symbolizes the political history and military architecture of the region during the medieval period."
    },
    {
        id: 3,
        name: "Sacred River Ghats",
        district: "eastern",
        religion: "hindu",
        image: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "Series of stepped stone embankments along the holy river, used for religious ceremonies and rituals for centuries.",
        importance: "Represents the living cultural traditions and spiritual practices connected to the sacred geography of the region."
    },
    {
        id: 4,
        name: "Historic Grand Mosque",
        district: "southern",
        religion: "islamic",
        image: "https://images.unsplash.com/photo-1512970648279-ff3398568f77?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176",
        description: "An architectural marvel from the 14th century featuring exquisite calligraphy and geometric patterns.",
        importance: "Exemplifies the fusion of local and Islamic architectural styles and serves as a center for community gathering."
    },
    {
        id: 5,
        name: "Colonial Cathedral",
        district: "central",
        religion: "christian",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "A stunning example of colonial-era architecture with beautiful stained glass windows and Gothic elements.",
        importance: "Marks the historical presence of European influences and the spread of Christianity in the region."
    },
    {
        id: 6,
        name: "Ancient Buddhist Monastery",
        district: "northern",
        religion: "buddhist",
        image: "https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
        description: "A serene monastery complex nestled in the mountains, housing ancient manuscripts and meditation halls.",
        importance: "Preserves the teachings and meditation practices of an ancient Buddhist tradition."
    }
];

// DOM elements
const sitesContainer = document.getElementById('sites-container');
const districtFilters = document.querySelectorAll('#district-filters .filter-btn');
const religionFilters = document.querySelectorAll('#religion-filters .filter-btn');

// Initialize the site cards
function renderSites(sites) {
    sitesContainer.innerHTML = '';
    
    sites.forEach(site => {
        const siteCard = document.createElement('div');
        siteCard.className = 'site-card';
        siteCard.setAttribute('data-district', site.district);
        siteCard.setAttribute('data-religion', site.religion);
        
        siteCard.innerHTML = `
            <div class="card-img">
                <img src="${site.image}" alt="${site.name}">
            </div>
            <div class="card-content">
                <h3>${site.name}</h3>
                <div class="card-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${site.district.charAt(0).toUpperCase() + site.district.slice(1)} District</span>
                    <span><i class="fas fa-praying-hands"></i> ${site.religion.charAt(0).toUpperCase() + site.religion.slice(1)}</span>
                </div>
                <p>${site.description}</p>
                <div class="card-actions">
                    <button class="btn">Learn More</button>
                    <button class="audio-btn" data-site="${site.id}">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
            </div>
        `;
        
        sitesContainer.appendChild(siteCard);
    });
    
    // Add event listeners to audio buttons
    document.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const siteId = this.getAttribute('data-site');
            playAudioDescription(siteId);
        });
    });
}

// Audio narration function
function playAudioDescription(siteId) {
    const site = heritageSites.find(s => s.id == siteId);
    if (!site) return;
    
    // In a real implementation, this would play actual audio
    // For this demo, we'll use the Web Speech API
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = `This is ${site.name}. ${site.description}. Its historical importance includes: ${site.importance}`;
        speech.volume = 1;
        speech.rate = 0.9;
        speech.pitch = 1;
        
        window.speechSynthesis.speak(speech);
    } else {
        alert(`Audio description for ${site.name}: ${site.description}. Historical importance: ${site.importance}`);
    }
}

// Filter functionality
function filterSites() {
    const activeDistrict = document.querySelector('#district-filters .filter-btn.active').getAttribute('data-filter');
    const activeReligion = document.querySelector('#religion-filters .filter-btn.active').getAttribute('data-filter');
    
    let filteredSites = heritageSites;
    
    if (activeDistrict !== 'all') {
        filteredSites = filteredSites.filter(site => site.district === activeDistrict);
    }
    
    if (activeReligion !== 'all') {
        filteredSites = filteredSites.filter(site => site.religion === activeReligion);
    }
    
    renderSites(filteredSites);
}

// Initialize filters
districtFilters.forEach(btn => {
    btn.addEventListener('click', function() {
        districtFilters.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterSites();
    });
});

religionFilters.forEach(btn => {
    btn.addEventListener('click', function() {
        religionFilters.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterSites();
    });
});

// Initial render
document.addEventListener('DOMContentLoaded', function() {
    renderSites(heritageSites);

});