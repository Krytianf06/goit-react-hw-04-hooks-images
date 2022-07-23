import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Searchbar = ({ onInput, onSubmit, keyword }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const kw = event.target.keyword.value.trim();
    if (kw === '') {
      toast.error(
        "It looks like you asked the same query. Please enter another query."
      );
      return;
    }
    if (keyword === kw) {
      toast.error(
        "It looks like you asked the same query. Please enter another query."
      );
      return;
    }
    onInput(kw);
    onSubmit();
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchform} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <ImSearch />
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="keyword"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default Searchbar;
