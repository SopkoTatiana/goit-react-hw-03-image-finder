import { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { value } = this.state;

    onSubmit(value.trim());

    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <header className={css.Header}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <AiOutlineSearch className={css.SearchFormButtonIcon} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            value={this.state.value}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
