import React from 'react';
import ReactDOM  from 'react-dom';
import Movie from './components/Movie.jsx';
import Search from './components/Search.jsx';
import AddMovie from './components/AddMovie.jsx';
import $ from 'jquery';


class MovieList extends React.Component {
  constructor() {
    super();

    this.state = {
        movies:  [],
        view:  'all',
        search:  ''
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/load',
      method: 'GET',
      contentType: 'application/json',
      success: () => {
        this.getMovies();
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    });
  }

  filterByView(movieListFilteredBySearch) {
    if (this.state.view === 'all') { 
      return movieListFilteredBySearch; 
    } else {
      return movieListFilteredBySearch.filter( movie => {
         if (this.state.view === 'watched') {
          return (movie.watched) ? true : false;
         } else {
           return (!movie.watched) ? true : false;
         }
      })
    }
  }

  filterBySearch(searchQuery) {
    if (searchQuery === '') { 
      return this.state.movies; 
    }
    else {
      return this.state.movies.filter( movie => {
        return movie['title'].toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
  }
  
  searchMovies(searchQuery) {
    this.setState({ 
        search: searchQuery
    });
  }

  getMovies() {
    $.ajax({
      url: '/movies',
      method: 'GET',
      contentType: 'application/json',
      success: (movieData) => {
        this.setState({
          movies: movieData
        })
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    });
  }

  addMovie(newMovieTitle) {
    $.ajax({
      url: '/movie',
      method: 'POST',
      data: JSON.stringify({
        title:      newMovieTitle,
        watched:    false
      }),
      contentType: 'application/json',
      success: () => {
        this.getMovies();
      },
      error: (xhr, status, error) => {
        console.log('err', xhr, status, error);
      }
    });
  }

  toggleWatchedMovie(toggledMovie) {
    toggledMovie.watched = toggledMovie.watched ? !toggledMovie.watched : true;
    this.setState({
      view: this.state.view
    }) 
  }

  setViewToWatched() {
    this.setState({
      view:  'watched'
    });
  }

  setViewToUnwatched() {
    this.setState({ 
      view:  'unwatched'
    });
  }

  setViewToAll() {
    this.setState({
      view: 'all',
      search: ''
    });
  }

  displayMovies() {
    let searchFilteredMovieList =  this.filterBySearch(this.state.search);
    return this.filterByView(searchFilteredMovieList);
  }



  render() {
    const { movies } = this.state;
    
    return (
      <div>
          <AddMovie addMovieFunction={this.addMovie.bind(this) } />
          <br />
          <Search searchFunction={this.searchMovies.bind(this) } />
          <br />
          <br />
          <button id="filterButton" onClick={this.setViewToWatched.bind(this)}>Watched Movies</button>
          <button id="filterButton" onClick={this.setViewToUnwatched.bind(this)}>Unwatched Movies</button>
          <button id="filterButton" onClick={this.setViewToAll.bind(this) }>All Movies</button>
          <br />
          { 
            this.displayMovies().map( (movie, index) => 
            { 
              return <Movie key={index} 
                            id={index} 
                            movie={movie} 
                            handleToggle={this.toggleWatchedMovie.bind(this)}/> 
            })
          }
      </div>
    )
  }
}

ReactDOM.render( <MovieList />, document.getElementById('app'));
