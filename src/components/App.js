import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions/action';

class App extends React.Component {
  componentDidMount() {
    const {store} = this.props;
    store.subscribe(() => {
      console.log('Updated');
      this.forceUpdate(); //Never use this bro 
    });
    // API to get the movies
    // Dispatch action to send movies to store
    this.props.store.dispatch(addMovies(data));

  }

  isMovieFavourite = (movie) => {
    const {favourites} = this.props.store.getState();
    const index = favourites.indexOf(movie);

    if (index !== -1) {
      return true;
    }
    return false;
  }

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val))
  }
  
  render() {
    console.log('State: ', this.props.store.getState());
    const { list, favourites, showFavourites} = this.props.store.getState();

    const displayMovies = showFavourites ? favourites: list;
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <div className="tabs">
          <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
          <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list">
          { 
            displayMovies .map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))
          }
        </div>
        {displayMovies.length == 0 ? <div className='no-movies'>No Movies to Display!</div> : null}
      </div>
    </div>
  );
  }
}

export default App;
