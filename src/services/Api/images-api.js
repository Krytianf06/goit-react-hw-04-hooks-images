import axios from "axios";

const key = "26584808-de6453e81ed644e8a5f6a08c0";
axios.defaults.baseURL = "https://pixabay.com/api/";
const params = "image_type=photo&orientation=horizontal&per_page=15";

async function fetchImagesApi(query, page) {
  const {
    data: { hits },
  } = await axios.get(`?&q=${query}&page=${page}&key=${key}&${params}`);
  return hits;
}

export default fetchImagesApi;
