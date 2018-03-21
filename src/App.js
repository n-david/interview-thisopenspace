import React, { Component } from 'react';
import thisopenspace from './thisopenspace.png';
import './App.css';

//***** COMPONENTS *****
import Loading from './Components/Loading';
// import SortBy from './SortBy/SortBy';
import Listing from './Listing/Listing';
import Pages from './Pages/Pages';

class App extends Component {
  state = {
    listings: null,
    pageSize: null,
    total: null,
    loading: true,
    currentPage: 1,
  };

  componentWillMount() {
    this.prodENV = process.env.NODE_ENV === 'production';
  }

  componentDidMount() {
    this.fetchListings();
  }

  componentDidUpdate() {
    //Scroll to top of page on component update
    window.scrollTo(0, 0);
  }

  //***** HANDLERS *****
  onClickChangePage = nextOrPrev => {
    this.setState(
      prevState => ({
        currentPage:
          nextOrPrev === 'NEXT'
            ? prevState.currentPage + 1 // Add one to currentPage if NEXT clicked
            : prevState.currentPage - 1, // Minus one to currentPage if PREV clicked
      }),
      () => this.fetchListings()
    );
  };

  onClickJumpToPage = pageNumber => {
    this.setState({ currentPage: pageNumber }, () => this.fetchListings());
  };

  //***** HELPERS *****
  fetchListings = async () => {
    this.setState({ loading: true });

    try {
      const response = await fetch(
        `${this.prodENV ? 'api' : ''}/lhl-test?page=${this.state.currentPage}`
      );
      const listings = await response.json();
      console.log(listings);

      this.setState({
        listings: listings.data,
        pageSize: listings.page_size,
        total: listings.total,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // fetchAllListings = async () => {
  //   try {
  //     const pageOne = await fetch('http://localhost:3000/lhl-test?page=1');
  //     const pageOneJSON = await pageOne.json();
  //     const pageTwo = await fetch('http://localhost:3000/lhl-test?page=2');
  //     const pageTwoJSON = await pageTwo.json();
  //     const pageThree = await fetch('http://localhost:3000/lhl-test?page=3');
  //     const pageThreeJSON = await pageThree.json();
  //     const pageFour = await fetch('http://localhost:3000/lhl-test?page=4');
  //     const pageFourJSON = await pageFour.json();
  //
  //     console.log([
  //       ...pageOneJSON.data,
  //       ...pageTwoJSON.data,
  //       ...pageThreeJSON.data,
  //       ...pageFourJSON.data,
  //     ]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  render() {
    const { listings, pageSize, total, loading, currentPage } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={thisopenspace} className="App-logo" alt="logo" />
          <h1 className="App-title">thisopenspace</h1>
        </header>
        {/*<div className="sort-by-container">*/}
        {/*Show me <SortBy /> spaces*/}
        {/*</div>*/}
        <div className="listings-container">
          {loading ? (
            <Loading />
          ) : (
            listings.map(listing => (
              <Listing key={listing.id} listing={listing} />
            ))
          )}
        </div>
        {!loading && (
          <footer className="App-footer">
            <Pages
              pageSize={pageSize}
              total={total}
              currentPage={currentPage}
              onClickChangePage={this.onClickChangePage}
              onClickJumpToPage={this.onClickJumpToPage}
            />
          </footer>
        )}
      </div>
    );
  }
}

export default App;
