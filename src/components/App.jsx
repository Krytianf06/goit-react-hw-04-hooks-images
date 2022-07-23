import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

const INITIAL_STATE = {
  keyword: '',
  currentPage: 1,
};

const App = () => {
  const [keyword, setKeyword] = useState(INITIAL_STATE.keyword);
  const [currentPage, setCurrentPage] = useState(INITIAL_STATE.currentPage);

  const updateStateWithKeyword = k => {
    setKeyword(k);
  };

  const onLoadMoreClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const onSubmit = () => {
    setCurrentPage(1);
  };

  return (
    <div className={s.app}>
      <Searchbar
        keyword={keyword}
        onInput={updateStateWithKeyword}
        onSubmit={onSubmit}
      />
      <ImageGallery
        keyword={keyword}
        onLoadMoreClick={onLoadMoreClick}
        currentPage={currentPage}
      />
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
