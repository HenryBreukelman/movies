
/*
movies is now an array of movies

function: searchMovies
filter to compare the user input with the moview title
return the movies found

function listMovies(input)
const ocurrences = searchMovies(input)
if ocurrences.length > 0 list movies
  interact through ocurrences and set movie titles to a <li>
  <li> -> <ul>
else -> movie not found

function to get selected movie
this function is like the first one, but instaed of includes() you just compare
the movie titles with the imput (===)

once the selected movie is found, you build the html and send it to its parent
the css must be there already

*/

import { select } from './utils.js';
'use strict';

// This app requires a server to handle import statements
// and CORS issues
import * as utils from './utils.js';
import movies from './movies.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Search Suggestions                                   */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */

const searchInput = utils.select('.movie-search-input');


function searchMovies(searchTerm) {
  const matchingMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchingTitles = matchingMovies.map(movie => movie.title);
  return matchingTitles.length > 5 ? matchingTitles.splice(0, 5) : matchingTitles;
}
/* utils.listen('input', searchInput, () => utils.print(searchMovies(searchInput.value))); */



const matchedMoviesDisplay = utils.select('.matched-movies-wrapper ul');

function listMovies(input) {
  if (input.length < 3) {
    matchedMoviesDisplay.innerHTML = '';
    return;
  }

  matchedMoviesDisplay.innerHTML = '';
  const occurences = searchMovies(input);

  if (occurences.length > 0) {
    occurences.forEach(occurence => {
      const newLi = document.createElement('li');
      newLi.textContent = occurence;
      matchedMoviesDisplay.appendChild(newLi);
    })
    
  } else {
    matchedMoviesDisplay.innerHTML = '<li>Movie not found</li>'
  }
}

 utils.listen('input', searchInput, () => listMovies(searchInput.value));