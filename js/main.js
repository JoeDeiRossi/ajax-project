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
      searchResult.setAttribute('id', results[i].id);

      const rowDiv = document.createElement('div');
      rowDiv.setAttribute('class', 'row');
      searchResult.appendChild(rowDiv);

      const title = document.createElement('p');
      title.setAttribute('class', 'result-text');
      title.textContent = currentResult.title;
      rowDiv.appendChild(title);

      firstResults.appendChild(searchResult);

      searchResult.addEventListener('click', event => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.themoviedb.org/3/movie/${searchResult.getAttribute('id')}/credits?api_key=b638ba27b8c344059fe14ec066253c2e`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          const cast = xhr.response.cast;

          while (firstResults.hasChildNodes()) {
            firstResults.removeChild(firstResults.firstChild);
          }

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

          firstResults.appendChild(castDropdown);
          firstResults.appendChild(castContainer);
        });
        xhr.send();
      });
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
      searchResult.setAttribute('id', results[i].id);

      const rowDiv = document.createElement('div');
      rowDiv.setAttribute('class', 'row');
      searchResult.appendChild(rowDiv);

      const title = document.createElement('p');
      title.setAttribute('class', 'result-text');
      title.textContent = currentResult.title;
      rowDiv.appendChild(title);

      secondResults.appendChild(searchResult);

      searchResult.addEventListener('click', event => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.themoviedb.org/3/movie/${searchResult.getAttribute('id')}/credits?api_key=b638ba27b8c344059fe14ec066253c2e`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          const cast = xhr.response.cast;

          while (secondResults.hasChildNodes()) {
            secondResults.removeChild(secondResults.firstChild);
          }

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

          secondResults.appendChild(castDropdown);
          secondResults.appendChild(castContainer);
        });
        xhr.send();
      });
    }
  });
  xhr.send();
});
