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
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}" style="width:400px;height:400px; margin-top: 20px;">
                <p><strong>Title:</strong> ${item.title} <br> 
                <strong>Artist:</strong> ${item.artist} <br> 
                <strong>Album:</strong> ${item.album}</p>
            `;
            resultsDiv.appendChild(itemDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadData);

document.querySelector('.btn-search').addEventListener('click', search);
document.querySelector('.btn-random').addEventListener('click', random);
document.querySelector('.btn-all').addEventListener('click', displayAll);
document.querySelectorAll('.btn-artist').forEach(button => button.addEventListener('click', filterByArtist));
