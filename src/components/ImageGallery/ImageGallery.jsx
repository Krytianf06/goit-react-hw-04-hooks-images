import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import s from './ImageGallery.module.css';
import { fetchImages } from 'service/fetchImages';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

const INITIAL_STATE = {
  images: [],
  isLoading: false,
  modalShown: false,
  currentImage: null,
};

const ImageGallery = ({ currentPage, keyword, onLoadMoreClick }) => {
  const [images, setImages] = useState(INITIAL_STATE.images);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [modalShown, setModalShown] = useState(INITIAL_STATE.modalShown);
  const [currentImage, setCurrentImage] = useState(INITIAL_STATE.currentImage);

  const enableLoader = () => {
    setIsLoading(true);
  };

  const disableLoader = () => {
    setIsLoading(false);
  };

  const toggleModal = () => {
    setModalShown(prevModal => !prevModal);
  };

  const setCurrentImageTo = img => {
    setCurrentImage(img);
  };

  const handleImageClick = event => {
    setCurrentImage(event.target.dataset.bigsrc);
    toggleModal();
  };

  const onBackdropClicked = event => {
    if (event.target === event.currentTarget) {
      toggleModal();
      setCurrentImageTo(null);
    }
  };

  useEffect(() => {
    const onEscPressed = event => {
      if (event.code !== 'Escape') return;
      toggleModal();
      setCurrentImageTo(null);
    };

    document.addEventListener('keydown', onEscPressed);

    return () => {
      document.removeEventListener('keydown', onEscPressed);
    };
  }, []);

  useEffect(() => {
    const updateStateWithData = data => {
      if (currentPage === 1) {
        setImages([...data]);
      } else {
        setImages(prevState => [...prevState, ...data]);
      }
    };
    if (keyword === '') {
      return;
    }
    enableLoader();
    fetchImages(keyword, currentPage)
      .then(updateStateWithData)
      .catch(console.error)
      .finally(disableLoader);
  }, [keyword, currentPage]);

  return keyword !== '' ? (
    <div className={s.center}>
      <ul className={s.gallery}>
        {images?.length > 0 &&
          images.map(image => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              big={image.largeImageURL}
              alt={`${keyword}`}
              onImageClick={handleImageClick}
            />
          ))}
      </ul>
      {images.length === 0 && !isLoading && <h1>Nothing Found</h1>}
      {isLoading && <Loader />}
      {images.length > 0 && <Button loadMore={onLoadMoreClick} />}
      {modalShown && (
        <Modal onBackdropClick={onBackdropClicked}>
          <img src={currentImage} alt={keyword} />
        </Modal>
      )}
    </div>
  ) : (
    <h1 className={s.center}>Please, enter what you are looking for</h1>
  );
};

ImageGallery.propTypes = {
  keyword: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
};

export default ImageGallery;
