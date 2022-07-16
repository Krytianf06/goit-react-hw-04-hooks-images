import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import ImageError from "../ImageError/ImageError";
import fetchImagesApi from "../../services/Api/images-api";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    const fetchImages = async () => {
      try {
        const data = await fetchImagesApi(query, page);
        setImages((images) => [...images, ...data]);
        if (page !== 1) {
          scrollWindow();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const loadMore = () => {
    setLoading(!loading);
    setPage((prev) => prev + 1);
    setLoading(loading);
  };

  const scrollWindow = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = images.length > 0 && images.length >= 12;
  const imagesListEmpty = query !== "";

  return (
    <div className={s.App}>
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        imagesListEmpty && <ImageError message={query} />
      )}
      {loadMoreImages && <Button onLoadMore={loadMore} />}
      {loading && <Loader />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
