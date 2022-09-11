import { onEscapeClose } from './onModalCloseBtn';

const refs = {
  cardList: document.querySelector('.card-list'),
};

export function fetchPopularFilms() {
  fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=dfb50cc3b16f950a5a6b0ea437e17f05'
  )
    .then(r => r.json())
    .then(({ results }) => renderMarkup(results))
    .catch(console.log);
}

fetchPopularFilms();

export function renderMarkup(films) {
  const newMarkup = films
    .map(film => {
      const { original_title, poster_path, vote_average, release_date } = film;

      const year = new Date(release_date).getFullYear();
      // const photo =

      return ` <li class="card-list__item">
                <a href="" class="card-list__link">
                    <picture class="card-list_picture">
                        <img src="../images/dummy.jpg" alt="Poster to movie">
                    </picture>
                    <h2 class="card-list__title"><span class="card-list__movie-name">${original_title}</span> Drama, Action |
                        ${year}<span class="card-list__ratimg">${vote_average.toFixed(
        2
      )}</span></h2>
                </a>
            </li>`;
    })
    .join('');

  refs.cardList.innerHTML = newMarkup;

  modalFilmOpen();
}

function modalFilmOpen() {
  const cardLinks = document.querySelectorAll('.card-list__link');
  const filmModal = document.querySelector('.backdrop');

  for (let cardLink of cardLinks) {
    cardLink.addEventListener('click', onCardLinkClick);
  }

  function onCardLinkClick(e) {
    e.preventDefault();
    filmModal.classList.remove('is-hidden');

    if (!filmModal.classList.contains('is-hidden')) {
      onEscapeClose();
    }
  }
}

function fetchFilmPhoto(posterPath) {
  if (posterPath === null) {
    return '../images/dummy.jpg';
  }
  posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'gsf';
}
