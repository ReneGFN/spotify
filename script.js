const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlist');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
}
function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    const filteredResults = result.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const limitedResults = filteredResults.slice(0, 5);
    resultArtist.innerHTML = '';
    
    if (limitedResults.length === 0) {
        resultArtist.style.display = 'none';
    } else {
        resultArtist.style.display = 'flex';
        limitedResults.forEach(element => {
            const artistCard = document.createElement("div");
            artistCard.classList.add("artist-card");
            artistCard.innerHTML = `
                <div class="card-img">
                    <img class="artist-img" src="${element.urlImg}" alt="${element.name}">
                </div>
                <div class="card-text">
                    <span class="artist-name">${element.name}</span>
                    <span class="artist-categorie">Artista</span>
                </div>
                <div class="play">
                    <i class="fa fa-play"></i>
                </div>
            `;
            const playButton = artistCard.querySelector('.play');
            playButton.addEventListener('click', () => {
                window.open(element.spotifyUrl, '_blank');
            });
            resultArtist.appendChild(artistCard);
        });
    }
}
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.style.display = 'none';
        resultArtist.innerHTML = '';
        return;
    }

    requestApi(searchTerm);
});