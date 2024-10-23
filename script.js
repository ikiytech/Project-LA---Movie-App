const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
const POPULAR_API = 'https://api.themoviedb.org/3/movie/popular?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const topRatedBtn = document.getElementById('top-rated'); // New - Hook for Top Rated menu

// Global variable to store movies
let movies = [];

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    movies = data.results; // Store the fetched movies in a global variable
    showMovies(movies); // Display movies
}

// Function to display movies
function showMovies(movies) {
    main.innerHTML = ''; // Clear the existing movies

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Function to get color class based on rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Sort movies by rating (descending order)
function sortMoviesByRating(movies) {
    return movies.sort((a, b) => b.vote_average - a.vote_average);
}

// Event listener for the search functionality
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }
});

// Event listener for sidebar buttons
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

openBtn.addEventListener('click', () => {
    sidebar.style.left = '0';
});

closeBtn.addEventListener('click', () => {
    sidebar.style.left = '-250px';
});

// Event listener for "Top Rated" menu item
topRatedBtn.addEventListener('click', () => {
    const sortedMovies = sortMoviesByRating(movies); // Sort movies by rating
    showMovies(sortedMovies); // Display sorted movies
});

// URL API untuk Popular Movies
const popularBtn = document.getElementById('popular');

// Event listener untuk tombol Popular Movies
popularBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah reload halaman
    getMovies(POPULAR_API); // Panggil fungsi getMovies dengan URL Popular Movies
});