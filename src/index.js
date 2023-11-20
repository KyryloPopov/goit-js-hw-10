import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_J9jwzzBV3WiLVAM4KqKGIAy8fm0AJ67037e8zVx6wNNYGgFlkIsEtaWlZfQODbNe';

const selectBreedEl = document.querySelector('.breed-select');
selectBreedEl.addEventListener('change', selectCat);
const catInfoDiv = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

function showError() {
  catInfoDiv.style.display = 'none';
  loaderEl.style.display = 'none';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function showLoader() {
  catInfoDiv.style.display = 'none';
  loaderEl.style.display = 'block';
}

function hideLoader() {
  catInfoDiv.style.display = 'flex';
  loaderEl.style.display = 'none';
}

fetchBreeds()
  .then(data => {
    let selectMarkup = data
      .map(({ reference_image_id, name }) => {
        return `<option value="${reference_image_id}">${name}</option>`;
      })
      .join('');
    // selectMarkup = '<option>Placeholder</option>' + selectMarkup;
    selectBreedEl.style.display = 'block';
    hideLoader();
    selectBreedEl.innerHTML = selectMarkup;
  })
  .catch(err => showError());

function selectCat(event) {
  showLoader();
  const selectedBreed = event.target.value;
  fetchCatByBreed(selectedBreed)
    .then(({ breeds, url }) => {
      catInfoDiv.innerHTML = `
      <img class="cat-img" src="${url}" width="400px">
      <div class="cat-details">
        <h2 class="cat-breed">${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p class="cat-temperament">
        <span>Temperament:</span> ${breeds[0].temperament}
        </p>
      </div>
      `;
      hideLoader();
    })
    .catch(err => showError());
}
