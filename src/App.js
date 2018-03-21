import React, { Component } from 'react';
import thisopenspace from './thisopenspace.png';
import './App.css';

//***** COMPONENTS *****
import Loading from './Components/Loading';
import Listing from './Listing/Listing';

class App extends Component {
  state = {
    listings: [],
    loading: true,
    currentPage: 1,
    lastPageReached: false,
  };

  componentWillMount() {
    this.prodENV = process.env.NODE_ENV === 'production';
  }

  componentDidMount() {
    this.fetchListings();
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  //***** HANDLERS *****
  onScroll = () => {
    const { loading, lastPageReached } = this.state;

    const body = document.body;
    const doc = document.documentElement;
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : doc.offsetHeight;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      doc.clientHeight,
      doc.scrollHeight,
      doc.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      console.log('bottom reached');

      if (!lastPageReached && !loading) {
        this.setState(
          prevState => ({ currentPage: prevState.currentPage + 1 }),
          () => this.fetchListings()
        );
      }
    }
  };

  onClickScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  //***** HELPERS *****
  fetchListings = async () => {
    const { currentPage } = this.state;
    this.setState({ loading: true });

    try {
      const response = await fetch(
        `${this.prodENV ? 'api' : ''}/lhl-test?page=${currentPage}`
      );
      const listings = await response.json();
      console.log(listings);

      this.setState(prevState => ({
        listings: [...prevState.listings, ...listings.data],
        loading: false,
        lastPageReached: currentPage * 10 >= listings.total,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { listings, loading, lastPageReached } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={thisopenspace} className="App-logo" alt="logo" />
          <h1 className="App-title">thisopenspace</h1>
        </header>
        <div className="listings-container">
          {listings.map(listing => (
            <Listing key={listing.id} listing={listing} />
          ))}
          {loading && <Loading />}
        </div>
        {!loading &&
          lastPageReached && (
            <footer className="App-footer">
              <div className="back-to-top" onClick={this.onClickScrollToTop}>
                BACK TO TOP
              </div>
            </footer>
          )}
      </div>
    );
  }
}

export default App;
