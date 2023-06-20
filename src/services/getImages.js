const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '35178291-396a475acbd7be5fd5986a1bd';

const getImages = (query, page) => {
  return fetch(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default getImages;
