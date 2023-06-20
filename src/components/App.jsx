import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button';
import getImages from 'services/getImages';
import Loader from './Loader';

const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const INITIAL_STATE = {
  query: '',
  images: [],
  page: 1,
  status: Status.IDLE,
  total: 0,
  error: '',
};

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query, images } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ status: Status.LOADING });

      getImages(query, page)
        .then(res => res.json())
        .then(({ totalHits, hits }) => {
          if (totalHits === 0) {
            throw new Error("Couldn't find the image you requested!");
          } else {
            this.setState({
              images: [...images, ...hits],
              total: totalHits,
              status: Status.SUCCESS,
            });
          }
        })
        .catch(({ message }) =>
          this.setState({ error: message, status: Status.ERROR })
        );
    }
  }

  handleFormSubmit = query => {
    if (query === '' || query === this.state.query) {
      return;
    }

    this.setState({
      ...INITIAL_STATE,
      query,
    });
  };

  nextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, total, error } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {images.length < total && <Button onClick={this.nextPage} />}
        {status === Status.LOADING && <Loader />}
        {status === Status.ERROR && <p>{error}</p>}
      </>
    );
  }
}

export default App;
