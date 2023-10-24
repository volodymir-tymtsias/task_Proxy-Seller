const BASE_URL = 'https://jsonplaceholder.typicode.com';

// a promise resolved after a given delay
function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request(url) {
  // for a demo purpose we emulate a delay to see if Loaders work
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => response.json());
}

export const getUsers = () => {
  return request(`/users`);
};
export const getUser = (userId) => {
  return request(`/users/${userId}`);
};

export const getPosts = (userId) => {
  return request(`/posts?userId=${userId}`);
};

export const getAlbums = (userId) => {
  return request(`/albums?userId=${userId}`);
};
