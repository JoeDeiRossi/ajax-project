const searchButtons = document.querySelectorAll('.search');
const firstResults = document.querySelector('.results.first');
const secondResults = document.querySelector('.results.second');

searchButtons[0].addEventListener('click', () => {
  const searchedMovie = document.querySelector('input.first');
  searchedMovie.style.display = 'none';
  searchButtons[0].style.display = 'none';
  while (firstResults.hasChildNodes()) {
    firstResults.removeChild(firstResults.firstChild);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=b638ba27b8c344059fe14ec066253c2e&query=${searchedMovie.value}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const results = xhr.response.results;
    for (let i = 0; i < 5; i++) {
      const currentResult = results[i];
      const searchResult = document.createElement('li');

      const rowDiv = document.createElement('div');
      rowDiv.setAttribute('class', 'row');
      searchResult.appendChild(rowDiv);

      const title = document.createElement('p');
      title.setAttribute('class', 'result-text');
      title.textContent = currentResult.title;
      rowDiv.appendChild(title);

      firstResults.appendChild(searchResult);
    }
  });
  xhr.send();
});

searchButtons[1].addEventListener('click', () => {
  const searchedMovie = document.querySelector('input.second');
  searchedMovie.style.display = 'none';
  searchButtons[1].style.display = 'none';
  while (secondResults.hasChildNodes()) {
    secondResults.removeChild(secondResults.firstChild);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=b638ba27b8c344059fe14ec066253c2e&query=${searchedMovie.value}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const results = xhr.response.results;
    for (let i = 0; i < 5; i++) {
      const currentResult = results[i];
      const searchResult = document.createElement('li');

      const rowDiv = document.createElement('div');
      rowDiv.setAttribute('class', 'row');
      searchResult.appendChild(rowDiv);

      const title = document.createElement('p');
      title.setAttribute('class', 'result-text');
      title.textContent = currentResult.title;
      rowDiv.appendChild(title);

      secondResults.appendChild(searchResult);
    }
  });
  xhr.send();
});
