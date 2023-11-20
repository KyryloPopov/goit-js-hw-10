const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/${breedId}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}
