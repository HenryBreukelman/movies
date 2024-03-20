'use strict';

import movies from './movies.js';

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

console.log(movies)
console.log(select)