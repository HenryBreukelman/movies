
'use strict';

import * as utils from './utils.js';
import movies from './movies.js';

// Selectors

const searchInput = utils.select('.movie-input');
const moviesDisplay = utils.select('.matched-movies ul');
const findButton = utils.select('.find-button');
const movieContainer = utils.select('.movie-info');
const form = utils.select('form'); 

// Search Suggestions

function searchMovies(searchTerm) {
  const matchingMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchingTitles = matchingMovies.map(movie => movie.title);
  return matchingTitles.length > 5 ? matchingTitles.splice(0, 5) : matchingTitles;
}

function listMovies(input) {
  if (input.length < 3) {
    moviesDisplay.innerHTML = '';
    return;
  }

  moviesDisplay.innerHTML = '';
  const occurences = searchMovies(input);

  if (occurences.length > 0) {
    occurences.forEach(occurence => {
      const newLi = document.createElement('li');
      newLi.textContent = occurence;
      copyToInputOnClick(newLi);
      moviesDisplay.appendChild(newLi);
    })
    
  } else {
    moviesDisplay.innerHTML = '<li>Movie not found</li>'
  }
}

function copyToInputOnClick(element) {
  utils.listen('click', element, () => {
    searchInput.value = element.textContent;
    moviesDisplay.innerHTML = '';
  });
}

// Get Movie

function getMovie() {
  const movieFound = movies.find(movie => movie.title.trim().toLowerCase() === searchInput.value.trim().toLowerCase());

  let genres = '';
  movieFound.genre.forEach(singleGenre => {
    genres += `<span>${singleGenre}</span>`;
  });

  let movieDetailsHTML = `
  <div class="poster-wrapper">
    <figure>
      <img src="${movieFound.poster}" alt="${movieFound.title}">
    </figure>
  </div>
  <div class="info-container">
    <div class="info">
      <h2>${movieFound.title}</h2>
      <p class="release-duration">
        <span>${movieFound.year}</span> | <span>${movieFound.runningTime}</span>
      </p>
      <p class="description">${movieFound.description}</p>
      <p class="genres flex">
        ${genres}
      </p>
    </div>
  </div>
  `;

  movieContainer.innerHTML = movieDetailsHTML;
  movieContainer.classList.remove('hidden');
}

// Event listeners

utils.listen('input', searchInput, () => listMovies(searchInput.value));
utils.listen('click', findButton, getMovie);

utils.listen('submit', form, (event) => {
  event.preventDefault();
});
