const searchButtons = document.querySelectorAll('.search');
const firstResults = document.querySelector('.results.first');
const secondResults = document.querySelector('.results.second');

searchButtons[0].addEventListener('click', () => {
  handleSearchClick('first');
});

searchButtons[1].addEventListener('click', () => {
  handleSearchClick('second');
});

function handleSearchClick(searchWindow) {
  const index = searchWindow === 'first' ? 0 : 1;
  searchButtons[index].style.display = 'none';

  const searchedMovie = document.querySelector(`input.${searchWindow}`);
  searchedMovie.style.display = 'none';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=b638ba27b8c344059fe14ec066253c2e&query=${searchedMovie.value}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const results = xhr.response.results;
    for (let i = 0; i < 5; i++) {
      const currentResult = results[i];
      const searchResult = document.createElement('li');
      searchResult.setAttribute('id', results[i].id);

      const rowDiv = document.createElement('div');
      rowDiv.setAttribute('class', 'row');
      searchResult.appendChild(rowDiv);

      const title = document.createElement('p');
      title.setAttribute('class', 'result-text');
      title.textContent = currentResult.title;
      rowDiv.appendChild(title);

      searchWindow === 'first' ? firstResults.appendChild(searchResult) : secondResults.appendChild(searchResult);

      searchResult.addEventListener('click', event => {
        handleResultClick(searchWindow, searchResult);
      });
    }
  });
  xhr.send();
}

function handleResultClick(searchWindow, searchResult) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/movie/${searchResult.getAttribute('id')}/credits?api_key=b638ba27b8c344059fe14ec066253c2e`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const cast = xhr.response.cast;

    const castDropdown = document.createElement('li');
    castDropdown.className = 'dropdown';

    const rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row');
    castDropdown.appendChild(rowDiv);

    const castHeader = document.createElement('h2');
    castHeader.textContent = 'Cast';
    rowDiv.appendChild(castHeader);

    const castContainer = document.createElement('li');
    castContainer.className = 'cast-container';

    for (let i = 0; i < cast.length; i++) {
      const castMember = document.createElement('div');
      castMember.className = 'cast-member';
      castMember.textContent = cast[i].name + ' as ' + cast[i].character;
      castContainer.appendChild(castMember);
    }

    if (searchWindow === 'first') {
      while (firstResults.hasChildNodes()) {
        firstResults.removeChild(firstResults.firstChild);
      }
      firstResults.appendChild(castDropdown);
      firstResults.appendChild(castContainer);
    } else {
      while (secondResults.hasChildNodes()) {
        secondResults.removeChild(secondResults.firstChild);
      }
      secondResults.appendChild(castDropdown);
      secondResults.appendChild(castContainer);
    }
  });
  xhr.send();
}
