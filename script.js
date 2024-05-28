let data = [];

async function loadData() {
    const response = await fetch('Liked Songs_Exported.json');
    data = await response.json();
}

async function search(event) {
    event.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    const results = data.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.artist.toLowerCase().includes(query) ||
        item.album.toLowerCase().includes(query)
    );
    displayResults(results);
}

async function random(event) {
    event.preventDefault();
    const randomItems = [];
    const copyData = [...data];
    for (let i = 0; i < 5; i++) {
        if (copyData.length === 0) break;
        const randomIndex = Math.floor(Math.random() * copyData.length);
        randomItems.push(copyData.splice(randomIndex, 1)[0]);
    }
    displayResults(randomItems);
}

function displayAll() {
    displayResults(data);
}

function filterByArtist(event) {
    const artist = event.target.getAttribute('data-artist');
    const results = data.filter(item => item.artist.toLowerCase() === artist.toLowerCase());
    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found</p>';
    } else {
        results.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('result-item'); 
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <p><strong>Title:</strong> ${item.title} <br> 
                <strong>Artist:</strong> ${item.artist} <br> 
                <strong>Album:</strong> ${item.album}</p>
                <button class="info-btn">More Info</button>
            `;
            resultsDiv.appendChild(itemDiv);
        });
        document.querySelectorAll('.info-btn').forEach((button, index) => {
            button.addEventListener('click', () => displayModal(results[index]));
        });
    }
}

function displayModal(item) {
    const modal = document.getElementById('myModal');
    const modalInfo = document.getElementById('modal-info');
    const spotifyLink = document.getElementById('spotify-link');

    modal.style.display = "block";
    modalInfo.innerHTML = `
        <p><strong>Title:</strong> ${item.title}</p>
        <p><strong>Artist:</strong> ${item.artist}</p>
        <p><strong>Album:</strong> ${item.album}</p>
    `;
    spotifyLink.href = item.spotify_link; 

    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('myModal');
    if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', loadData);

document.querySelector('.btn-search').addEventListener('click', search);
document.querySelector('.btn-random').addEventListener('click', random);
document.querySelector('.btn-all').addEventListener('click', displayAll);
document.querySelectorAll('.btn-artist').forEach(button => button.addEventListener('click', filterByArtist));
