import axios from 'axios';

const MY_KEY = '26584808-de6453e81ed644e8a5f6a08c0';

const queryString = (keyword, page, perPage) =>
  `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

export async function fetchImages(keyword, page = 1, perPage = 15) {
  try {
    const response = await axios.get(queryString(keyword, page, perPage));
    return response.data.hits;
  } catch (error) {
    return error;
  }
}
